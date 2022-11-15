import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, VirtualProps, Proxy, ProxyProps} from './types';
import { register } from 'be-hive/register.js';
import { RenderContext } from 'trans-render/lib/types';

export class BeDendroid extends EventTarget implements Actions{
    async hydrate(pp: PP) {
        const {buttonsTempl, self, hydratingTransform} = pp;
        let templ = buttonsTempl as HTMLTemplateElement;
        if(templ === undefined){
            const {defaultTempl} = await import('./defaultTempl.js');
            templ = defaultTempl;
            
        }
        const {DTR} = await import('trans-render/lib/DTR.js');
        const ctx = {
            host: pp,
            hostController: this,
            match: hydratingTransform
        } as RenderContext;
        await DTR.transform(templ, ctx, self.querySelector('summary')!);
        const {isOrWillBe} = await import('be-decorated/isOrWillBe.js');
        self.querySelectorAll('details').forEach(details => {
            if(!isOrWillBe(details, 'dendroid')){
                details.setAttribute('be-dendroid', '');
            }
            
        });
    }

    expandAll({self}: PP, e: Event){
        self.querySelectorAll('details').forEach(details => details.open = true);
        self.open = true;
    }

    collapseAll({self}: PP, e: Event){
        self.open = false;
        self.querySelectorAll('details').forEach(details => details.open = false);
    }

}

const tagName = 'be-dendroid';
const ifWantsToBe = 'dendroid';
const upgrade = 'details';

define<Proxy & BeDecoratedProps<VirtualProps, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            virtualProps: ['buttonsTempl', 'hydratingTransform'],
            proxyPropDefaults: {
                hydratingTransform: {
                    expandAllP: [,'expandAll'],
                    collapseAllP: [,'collapseAll']
                }
            }
        },
        actions: {
            hydrate: 'hydratingTransform'
        }
    },
    complexPropDefaults:{
        controller: BeDendroid
    }
});

register(ifWantsToBe, upgrade, tagName);
