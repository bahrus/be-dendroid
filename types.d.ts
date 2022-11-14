import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export interface EndUserProps {}
export interface VirtualProps extends EndUserProps, MinimalProxy{

}

export type Proxy = HTMLTemplateElement & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface Actions{
    
}