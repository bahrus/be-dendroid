import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeDendroid extends EventTarget {
    async hydrate(pp) {
        const { buttonsTempl, self, hydratingTransform } = pp;
        let templ = buttonsTempl;
        if (templ === undefined) {
            const { defaultTempl } = await import('./defaultTempl.js');
            templ = defaultTempl;
        }
        const { DTR } = await import('trans-render/lib/DTR.js');
        const ctx = {
            host: pp,
            hostController: this,
            match: hydratingTransform
        };
        await DTR.transform(templ, ctx, self.querySelector('summary'));
        const { isOrWillBe } = await import('be-decorated/isOrWillBe.js');
        self.querySelectorAll('details').forEach(details => {
            if (!isOrWillBe(details, 'dendroid')) {
                details.setAttribute('be-dendroid', '');
            }
        });
    }
    expandAll({ self }, e) {
        self.querySelectorAll('details').forEach(details => details.open = true);
        self.open = true;
    }
}
const tagName = 'be-dendroid';
const ifWantsToBe = 'dendroid';
const upgrade = 'details';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            upgrade,
            virtualProps: ['buttonsTempl', 'hydratingTransform'],
            proxyPropDefaults: {
                hydratingTransform: {
                    expandAllP: [, 'expandAll']
                }
            }
        },
        actions: {
            hydrate: 'hydratingTransform'
        }
    },
    complexPropDefaults: {
        controller: BeDendroid
    }
});
register(ifWantsToBe, upgrade, tagName);
