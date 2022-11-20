import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';
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

export type PA = Partial<PP>;

export type PPE = [PA | undefined, EventConfigs<PP, Actions>]

export interface Actions{
    defineMenu(pp: PP): Promise<PPE>;
    expandAll(pp: PP, e: MouseEvent): void;
    collapseAll(pp: PP, e: MouseEvent): void;
    sortDesc(pp: PP): void;
    sortAsc(pp: PP): void;
}

