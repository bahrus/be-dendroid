import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {CEArgs} from 'trans-render/froop/types';

export interface EndUserProps {
    //buttonsTempl?: HTMLTemplateElement | string,
    //hydratingTransform?: Matches,
    menuMarkup?: string,
    menuBDConfig?: CEArgs<any, any>,
}
export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLDetailsElement>{

}

export type Proxy = HTMLDetailsElement & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface Actions{
    defineMenu(pp: PP): void;
}

