import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
import { setProp } from 'trans-render/lib/setProp.js';
export class BeDendroid extends EventTarget {
    //#template: HTMLTemplateElement | undefined;
    async addTreeContext(pp, returnObjMold) {
        const { self, treeContextFrom, summaryElSelector } = pp;
        const selfSummary = self.querySelector(summaryElSelector);
        let instance = selfSummary.querySelector('tree-context');
        let alreadyExisted = true;
        if (instance === null) {
            instance = document.createElement('tree-context');
            alreadyExisted = false;
        }
        if (customElements.get('tree-context') === undefined) {
            instance.setAttribute('be-importing', treeContextFrom);
        }
        if (!alreadyExisted) {
            selfSummary.appendChild(instance);
        }
        import('be-importing/be-importing.js');
        const eventRoutes = Object.values(returnObjMold[1]);
        for (const route of eventRoutes) {
            if (typeof route !== 'boolean') {
                route.of = instance;
            }
        }
        return returnObjMold;
    }
    expandAll({ self }, e) {
        const { localName } = self;
        self.querySelectorAll(localName).forEach(descendant => {
            this.toggleEl(descendant, true);
        });
        this.toggleEl(self, true);
    }
    toggleEl(el, val) {
        if (el instanceof HTMLDetailsElement) {
            el.open = val;
        }
        else {
            setProp(el, 'beDecorated.detailOriented.open', val);
        }
    }
    collapseAll({ self }, e) {
        const { localName } = self;
        this.toggleEl(self, false);
        self.querySelectorAll(localName).forEach(descendant => {
            this.toggleEl(descendant, false);
        });
    }
    #getStrVal(el) {
        switch (el.localName) {
            case 'details':
                return el.querySelector('summary').textContent;
            case 'fieldset':
                return el.querySelector('legend').textContent;
            default:
                return el.textContent;
        }
    }
    sortAsc(pp) {
        return this.sort(pp, 'asc');
    }
    sortDesc(pp) {
        return this.sort(pp, 'desc');
    }
    sort(pp, sortDir) {
        const { self, contentSelector } = pp;
        //if (sortDir === undefined) return;
        Array.from(self.querySelectorAll(contentSelector)).forEach((section) => {
            const sectionChildren = Array.from(section.children);
            const one = sortDir === 'asc' ? 1 : -1;
            const minusOne = sortDir === 'asc' ? -1 : 1;
            sectionChildren.sort((a, b) => {
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
                const child2 = child;
                const count$ = count.toString();
                child2.style.order = count$;
                child2.tabIndex = parseInt(count$);
                count++;
            });
        });
    }
    async cloneNode(pp) {
        const { self } = pp;
        const { beatify } = await import('be-hive/beatify.js');
        const clone = self.cloneNode(true);
        beatify(clone, self);
        self.insertAdjacentElement('afterend', clone);
    }
    deleteNode(pp) {
        const { self } = pp;
        self.remove();
    }
    searchNode(pp, e, search) {
        const searchString = search.value;
        const { self, searchNodeSelector, beSearchingProps } = pp;
        if (searchString === undefined || searchString === null || searchString === '') {
            if (beSearchingProps !== undefined) {
                self.beDecorated.searching.forText = searchString;
            }
            return;
        }
        this.collapseAll(pp, e);
        const newValLC = searchString.toLowerCase();
        const tNodes = Array.from(self.querySelectorAll(searchNodeSelector));
        tNodes.forEach((el) => {
            if (el.textContent.toLowerCase().indexOf(newValLC) > -1) {
                el.classList.add('match');
            }
            else {
                el.classList.remove('match');
            }
        });
        Array.from(self.querySelectorAll('details:has(.match)')).forEach((detailsEl) => {
            detailsEl.open = true;
        });
        const firstMatch = self.querySelector('.match');
        if (firstMatch !== null) {
            self.open = true;
            firstMatch.scrollIntoView();
        }
        if (beSearchingProps !== undefined) {
            self.beDecorated.searching.forText = searchString;
        }
    }
    attachBeSearchingProps(pp) {
        import('be-searching/be-searching.js');
        const { self, beSearchingProps } = pp;
        self.beDecorated.searching = beSearchingProps;
        self.setAttribute('be-searching', '');
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
            virtualProps: [
                'searchNodeSelector',
                'beSearchingProps',
                'treeContextFrom',
                'contentSelector',
                'summaryElSelector'
            ],
            proxyPropDefaults: {
                beSearchingProps: {},
                searchNodeSelector: 'div, summary',
                treeContextFrom: 'tree-context/tree-context.html',
                summaryElSelector: '*',
                contentSelector: 'section',
            }
        },
        actions: {
            addTreeContext: {
                ifAllOf: ['treeContextFrom'],
                ifNoneOf: ['resolved'],
                returnObjMold: [{ resolved: true }, {
                        expandAll: { on: 'click', of: 'tbd', composedPathMatches: '.expand-all' },
                        collapseAll: { on: 'click', of: 'tbd', composedPathMatches: '.collapse-all' },
                        sortDesc: { on: 'click', of: 'tbd', composedPathMatches: '.sort-desc' },
                        sortAsc: { on: 'click', of: 'tbd', composedPathMatches: '.sort-asc' },
                        cloneNode: { on: 'click', of: 'tbd', composedPathMatches: '.clone-node' },
                        deleteNode: { on: 'click', of: 'tbd', composedPathMatches: '.delete-node' },
                        searchNode: { on: 'input', of: 'tbd', composedPathMatches: 'input[type="search"]' }
                    }]
            },
            attachBeSearchingProps: 'beSearchingProps',
        }
    },
    complexPropDefaults: {
        controller: BeDendroid
    }
});
register(ifWantsToBe, upgrade, tagName);
