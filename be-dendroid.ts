import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, VirtualProps, Proxy, ProxyProps} from './types';
import { register } from 'be-hive/register.js';

export class BeDendroid extends EventTarget implements Actions{
    async hydrate(pp: PP) {
        const {buttonsTempl, self} = pp;
        if(buttonsTempl === undefined){
            const {defaultTempl} = await import('./defaultTempl.js');
            self.querySelector('summary')?.appendChild(defaultTempl.content.cloneNode(true));
        }
        
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
