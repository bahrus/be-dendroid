import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {Matches} from 'trans-render/lib/types';

export interface EndUserProps {
    buttonsTempl?: HTMLTemplateElement | string,
    hydratingTransform?: Matches
}
export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLDetailsElement>{

}

export type Proxy = HTMLDetailsElement & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface Actions{
    hydrate(pp: PP): void;
}