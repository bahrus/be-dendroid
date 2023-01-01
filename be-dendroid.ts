import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Attachable} from 'trans-render/lib/types';
import {Actions, PP, VirtualProps, Proxy, ProxyProps, PPE} from './types';
import { register } from 'be-hive/register.js';
import {setProp} from 'trans-render/lib/setProp.js';

export class BeDendroid extends EventTarget implements Actions{

    //#template: HTMLTemplateElement | undefined;

    async addTreeContext(pp: PP, returnObjMold: PPE) {
        const {self, treeContextFrom, summaryElSelector} = pp;
        const selfSummary = self.querySelector(summaryElSelector!)!; 
        let instance = selfSummary.querySelector('tree-context');
        let alreadyExisted = true;
        if(instance === null){
            instance = document.createElement('tree-context');
            alreadyExisted = false;
        }
        if(customElements.get('tree-context') === undefined){
            instance.setAttribute('be-importing', treeContextFrom!);
        }
        if(!alreadyExisted){
            selfSummary.appendChild(instance);
        }
        
        
        import('be-importing/be-importing.js');

        const eventRoutes = Object.values(returnObjMold[1]);
        for(const route of eventRoutes){
            if(typeof route !== 'boolean'){
                route.of = instance;
            }
            
        }
        return returnObjMold;
    }

    expandAll({self}: PP, e: Event){
        const {localName} = self;
        self.querySelectorAll(localName).forEach(descendant => {
            this.toggleEl(descendant, true);
        });
        this.toggleEl(self, true);
    }

    toggleEl(el: Element, val: boolean){
        if(el instanceof HTMLDetailsElement){
            el.open = val;
        }else{
            setProp(el, 'beDecorated.detailOriented.open', val);
        }
    }

    collapseAll({self}: PP, e?: Event){
        const {localName} = self;
        this.toggleEl(self, false);
        self.querySelectorAll(localName).forEach(descendant => {
            this.toggleEl(descendant, false);
        });
        
    }

    #getStrVal(el: HTMLElement) : string {
        switch (el.localName) {
            case 'details':
                return el.querySelector('summary')!.textContent as string;
            default:
                return el.textContent as string;
        }
    }

    sortAsc(pp: PP): void {
        return this.sort(pp, 'asc');
    }

    sortDesc(pp: PP): void {
        return this.sort(pp, 'desc');
    }

    sort(pp: PP, sortDir: 'desc' | 'asc'){
        const {self} = pp;
        //if (sortDir === undefined) return;
        Array.from(self.querySelectorAll('section')).forEach((section: any) =>{
            const sectionChildren = Array.from(section.children);
            const one = sortDir === 'asc' ? 1 : -1;
            const minusOne = sortDir === 'asc' ? -1 : 1;
            sectionChildren.sort((a: any, b: any) => {
                const lhs = this.#getStrVal(a);
                const rhs = this.#getStrVal(b);
                if (lhs < rhs)
                    return minusOne;
                if (lhs > rhs)
                    return one;
                return 0;
            });
            let count = 1;
            sectionChildren.forEach(child => {
                const child2 = child as HTMLElement;
                const count$ = count.toString();
                child2.style.order = count$;
                child2.tabIndex = parseInt(count$);
                count++;
            });
        })
    }

    async cloneNode(pp: PP){
        const {self} = pp;
        const {beatify} = await import('be-hive/beatify.js');
        const clone = self.cloneNode(true);
        beatify(clone as Element, self);
        self.insertAdjacentElement('afterend', clone as Element);
    }

    deleteNode(pp: PP): void {
        const {self} = pp;
        self.remove();
    }

    searchNode(pp: PP, e: InputEvent, search: HTMLInputElement){
        
        const searchString = search.value;
        const {self, searchNodeSelector, beSearchingProps} = pp;
        if (searchString === undefined || searchString === null || searchString === ''){
            if(beSearchingProps !== undefined){
                (<any>self).beDecorated.searching.forText = searchString;
            }
            return;
        }
            
        this.collapseAll(pp, e);
        
        const newValLC = searchString.toLowerCase();
        const tNodes = Array.from(self.querySelectorAll(searchNodeSelector!)); 
        tNodes.forEach((el: any) => {
            if (el.textContent!.toLowerCase().indexOf(newValLC) > -1) {
                el.classList.add('match');
            }
            else {
                el.classList.remove('match');
            }
        });
        Array.from(self.querySelectorAll('details:has(.match)')).forEach((detailsEl: any) =>{
            detailsEl.open = true;
        });
        const firstMatch = self.querySelector('.match');
        if(firstMatch !== null){
            self.open = true;
            firstMatch.scrollIntoView();
        }
        if(beSearchingProps !== undefined){
            (<any>self).beDecorated.searching.forText = searchString;
        }
    }

    attachBeSearchingProps(pp: PP){
        import('be-searching/be-searching.js');
        const {self, beSearchingProps} = pp;
        (<any>self).beDecorated.searching = beSearchingProps;
        self.setAttribute('be-searching', ''); 
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
            virtualProps: [/*'menuMarkup',*/ 'searchNodeSelector', 'beSearchingProps', 'treeContextFrom'],
            proxyPropDefaults: {
                beSearchingProps: {},
                searchNodeSelector: 'div, summary',
                treeContextFrom: 'tree-context/tree-context.html',
                summaryElSelector: '*'
            }
        },
        actions: {
            addTreeContext: {
                ifAllOf: ['treeContextFrom'],
                ifNoneOf: ['resolved'],
                returnObjMold: [{resolved: true}, {
                    expandAll: {on:'click', of: 'tbd', composedPathMatches: '.expand-all' },
                    collapseAll: {on: 'click', of: 'tbd', composedPathMatches: '.collapse-all'},
                    sortDesc: {on: 'click', of: 'tbd', composedPathMatches: '.sort-desc'},
                    sortAsc: {on: 'click', of: 'tbd', composedPathMatches: '.sort-asc'},
                    cloneNode: {on: 'click', of: 'tbd', composedPathMatches: '.clone-node'},
                    deleteNode: {on: 'click', of: 'tbd', composedPathMatches: '.delete-node'},
                    searchNode: {on: 'input', of: 'tbd', composedPathMatches: 'input[type="search"]'}
                }]
            },
            attachBeSearchingProps: 'beSearchingProps',
        }
    
        
    },
    complexPropDefaults:{
        controller: BeDendroid
    }
});

register(ifWantsToBe, upgrade, tagName);