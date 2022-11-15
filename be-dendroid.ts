import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, VirtualProps, Proxy, ProxyProps} from './types';
import { register } from 'be-hive/register.js';

export class BeDendroid extends EventTarget implements Actions{
    hydrate(pp: PP): void {
        
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
