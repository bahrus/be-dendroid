import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeDendroid extends EventTarget {
    //#template: HTMLTemplateElement | undefined;
    async addTreeContext(pp, returnObjMold) {
        const { self, treeContextFrom } = pp;
        const selfSummary = self.querySelector('summary'); //TODO: make this configurable
        const instance = document.createElement('tree-context');
        instance.setAttribute('be-importing', treeContextFrom);
        // (<any>instance).beDecorated = {
        //     importing: {
        //         from: treeContextFrom
        //     }
        // };
        selfSummary.appendChild(instance);
        import('be-importing/be-importing.js');
        // customElements.whenDefined('be-importing').then(() => {
        //     const beImporting = document.createElement('be-importing') as any as Attachable;
        //     beImporting.attach(instance);
        // });
        const eventRoutes = Object.values(returnObjMold[1]);
        for (const route of eventRoutes) {
            if (typeof route !== 'boolean') {
                route.of = instance;
            }
        }
        return returnObjMold;
    }
    expandAll({ self }, e) {
        self.querySelectorAll('details').forEach(details => details.open = true);
        self.open = true;
    }
    collapseAll({ self }, e) {
        self.open = false;
        self.querySelectorAll('details').forEach(details => details.open = false);
    }
    #getStrVal(el) {
        switch (el.localName) {
            case 'details':
                return el.querySelector('summary').textContent;
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
        const { self } = pp;
        //if (sortDir === undefined) return;
        Array.from(self.querySelectorAll('section')).forEach((section) => {
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
            virtualProps: [/*'menuMarkup',*/ 'searchNodeSelector', 'beSearchingProps', 'treeContextFrom'],
            proxyPropDefaults: {
                beSearchingProps: {},
                searchNodeSelector: 'div, summary',
                treeContextFrom: 'tree-context/tree-context.html'
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
