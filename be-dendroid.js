import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeDendroid extends EventTarget {
    async hydrate(pp) {
        const { buttonsTempl, self } = pp;
        if (buttonsTempl === undefined) {
            const { defaultTempl } = await import('./defaultTempl.js');
            self.querySelector('summary')?.appendChild(defaultTempl.content.cloneNode(true));
        }
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
                hydratingTransform: {}
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
