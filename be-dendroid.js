import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeDendroid extends EventTarget {
    async defineMenu(pp) {
        const { self, menuMarkup } = pp;
        const selfSummary = self.querySelector('summary');
        const fragment = new DOMParser().parseFromString(menuMarkup, 'text/html', {
            includeShadowRoots: true
        });
        selfSummary.appendChild(fragment.body.firstChild);
        const { isOrWillBe } = await import('be-decorated/isOrWillBe.js');
        self.querySelectorAll('details').forEach(details => {
            if (!isOrWillBe(details, 'dendroid')) {
                details.setAttribute('be-dendroid', '');
            }
        });
    }
    expandAll({ self }, e) {
        self.querySelectorAll('details').forEach(details => details.open = true);
        self.open = true;
    }
    collapseAll({ self }, e) {
        self.open = false;
        self.querySelectorAll('details').forEach(details => details.open = false);
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
            virtualProps: ['menuMarkup', 'menuBDConfig', 'menuTag'],
            proxyPropDefaults: {
                menuMarkup: String.raw `
<be-denroid-menu t-a-i-l-b-b-d>
    <template shadowroot=open>
        <xtal-side-nav>
            <button part=expand-all style="width:20px;padding:0px;display:inline-flex;" aria-label="Expand all" title="Expand all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD138F" class="bi bi-arrows-expand" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"/>
                </svg>
            </button>
            <button part=collapse-all style="width:20px;padding:0px;display:inline-flex;" aria-label="Collapse all" title="Collapse all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD138F" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z"/>
                </svg>
            </button>
        </xtal-side-nav>
    </template>
    <!---->
</be-denroid-menu>
                `,
                menuBDConfig: {
                    config: {}
                }
            }
        },
        actions: {
            defineMenu: {
                ifAllOf: ['menuMarkup'],
                ifNoneOf: ['menuTag']
            }
        }
    },
    complexPropDefaults: {
        controller: BeDendroid
    }
});
register(ifWantsToBe, upgrade, tagName);
