import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';
import {CEArgs} from 'trans-render/froop/types';
import {EndUserProps as BeSearchingEndUserProps} from 'be-searching/types';

export interface EndUserProps {
    //buttonsTempl?: HTMLTemplateElement | string,
    //hydratingTransform?: Matches,
    //menuMarkup?: string,
    //menuBDConfig?: CEArgs<any, any>,
    searchNodeSelector?: string,
    beSearchingProps?: BeSearchingEndUserProps;
    treeContextFrom?: string;
    summaryElSelector?: string,
}
export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLDetailsElement>{
    //isBranch: boolean;

}

export type Proxy = HTMLDetailsElement & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PA = Partial<PP>;

export type PPE = [PA | undefined, EventConfigs<PP, Actions>]

export interface Actions{
    addTreeContext(pp: PP, returnObjMold: PPE): Promise<PPE>;
    expandAll(pp: PP, e: MouseEvent): void;
    collapseAll(pp: PP, e: MouseEvent): void;
    sortDesc(pp: PP): void;
    sortAsc(pp: PP): void;
    cloneNode(pp: PP): void;
    deleteNode(pp: PP): void;
    searchNode(pp: PP, e: InputEvent, search: HTMLInputElement): void;
    attachBeSearchingProps(pp: PP): void;
}

