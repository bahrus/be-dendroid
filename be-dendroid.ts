import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, VirtualProps, Proxy, ProxyProps, PPE} from './types';
import { register } from 'be-hive/register.js';


let defined = false;
export class BeDendroid extends EventTarget implements Actions{
    async defineMenu(pp: PP) {
        const {self} = pp;
        const selfSummary = self.querySelector('summary')!;
        let instance: Element | undefined;
        if(!defined){
            const {menuMarkup} = pp;
       
            const fragment = (new DOMParser() as any).parseFromString(menuMarkup, 'text/html', {
                includeShadowRoots: true
            });
            instance = fragment.body.firstChild;
            selfSummary.appendChild(instance!);
            const {isOrWillBe} = await import('be-decorated/isOrWillBe.js');
            import('be-definitive/be-definitive.js');
            import('xtal-side-nav/xtal-side-nav.js');
            import('be-open-and-shut/be-open-and-shut.js');
            self.querySelectorAll('details').forEach(details => {
                if(!isOrWillBe(details, 'dendroid')){
                    details.setAttribute('be-dendroid', '');
                }
            });
            defined = true;
        }else{
            instance = document.createElement('be-dendroid-menu');
            selfSummary.appendChild(instance);
        }
        return [{resolved: true}, {
            expandAll: {on:'click', of: instance, composedPathMatches: '.expand-all' },
            collapseAll: {on: 'click', of: instance, composedPathMatches: '.collapse-all'},
            sortDesc: {on: 'click', of: instance, composedPathMatches: '.sort-desc'},
            sortAsc: {on: 'click', of: instance, composedPathMatches: '.sort-asc'},
            cloneNode: {on: 'click' of: instance, composedPathMatches: '.clone-node'},
        }] as PPE;
    }

    expandAll({self}: PP, e: Event){
        self.querySelectorAll('details').forEach(details => details.open = true);
        self.open = true;
    }

    collapseAll({self}: PP, e: Event){
        self.open = false;
        self.querySelectorAll('details').forEach(details => details.open = false);
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
            virtualProps: ['menuMarkup', 'menuBDConfig'],
            proxyPropDefaults: {
                menuMarkup: String.raw `
<be-dendroid-menu t-a-i-l-b-b-d be-definitive>
    <template shadowroot=open>
        <xtal-side-nav be-open-and-shut>

            <button part=expand-all class=expand-all aria-label="Expand all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD138F" class="bi bi-arrows-expand" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"/>
                </svg>
                <span>Expand All</span>
            </button>
            <button part=collapse-all class=collapse-all aria-label="Collapse all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD138F" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z"/>
                </svg>
                <span>Collapse All</span>
            </button>
            <button part=copy-to-clipboard class=copy-to-clipboard arial-label="Copy to clipboard">
                <svg version="1.1" id="Capa_1" width=16 height=16 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 445.479 445.479" style="enable-background:new 0 0 445.479 445.479;" xml:space="preserve"
                    fill="#CD138F">
                >
                <g>
                    <path d="M364.479,0H81C57.426,0,38.248,19.179,38.248,42.752v359.975c0,23.574,19.178,42.752,42.752,42.752h283.479
                        c23.573,0,42.752-19.178,42.752-42.752V42.752C407.231,19.179,388.052,0,364.479,0z M168.383,361.065l-41.618-41.618h41.618
                        V361.065z M178.383,299.447h-65.76V70.276h30.371V85.86c0,5.523,4.477,10,10,10h139.493c5.523,0,10-4.477,10-10V70.276h30.377
                        v304.93h-144.48v-65.76C188.383,303.924,183.906,299.447,178.383,299.447z M282.486,75.86H162.993V30h119.493V75.86z
                        M377.231,402.727c0,7.031-5.721,12.752-12.752,12.752H81c-7.031,0-12.752-5.721-12.752-12.752V42.752
                        C68.248,35.721,73.969,30,81,30h61.993v20.276h-40.371c-5.523,0-10,4.477-10,10v249.17c0,2.652,1.054,5.196,2.929,7.071
                        l75.76,75.76c1.875,1.875,4.419,2.929,7.071,2.929h164.48c5.523,0,10-4.477,10-10V60.276c0-5.523-4.477-10-10-10h-40.377V30h61.993
                        c7.031,0,12.752,5.721,12.752,12.752V402.727z"/>
                    <path d="M143.997,149.494h157.492c5.523,0,10-4.477,10-10s-4.477-10-10-10H143.997c-5.523,0-10,4.477-10,10
                        S138.474,149.494,143.997,149.494z"/>
                    <path d="M143.997,201.241h157.492c5.523,0,10-4.477,10-10s-4.477-10-10-10H143.997c-5.523,0-10,4.477-10,10
                        S138.474,201.241,143.997,201.241z"/>
                    <path d="M311.489,242.989c0-5.523-4.477-10-10-10H143.997c-5.523,0-10,4.477-10,10s4.477,10,10,10h157.492
                        C307.012,252.989,311.489,248.511,311.489,242.989z"/>
                </g>
                </svg>
                <span>Copy to clipboard</span>
            </button>
            <button part=sort-desc class=sort-desc arial-label="Sort descending.">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="16" height="16" fill="#CD138F" viewBox="0 0 521.968 521.969" style="enable-background:new 0 0 521.968 521.969;"
	 xml:space="preserve">
<g>
	<g>
		<path d="M100.603,519.35c2.136,1.75,4.37,2.619,6.701,2.619c2.521,0,4.755-0.863,6.702-2.619l92.92-92.914
			c1.94-2.332,2.913-4.664,2.913-6.996c0-2.711-0.875-4.949-2.62-6.701c-1.75-1.738-3.984-2.619-6.701-2.619h-19.205V9.321
			c0-2.711-0.875-4.951-2.62-6.689C176.943,0.881,174.709,0,171.992,0H48.742c-2.724,0-4.951,0.875-6.702,2.632
			c-1.75,1.738-2.625,3.984-2.625,6.689v400.798H14.096c-4.271,0-7.185,1.947-8.739,5.826c-1.555,3.697-0.875,7.088,2.038,10.197
			L100.603,519.35z"/>
		<path d="M265.756,90.441h74.566c2.717,0,4.95-0.875,6.701-2.625c1.75-1.738,2.625-3.972,2.625-6.689V25.19
			c0-2.705-0.875-4.951-2.625-6.689c-1.744-1.75-3.984-2.632-6.701-2.632h-74.566c-2.724,0-4.951,0.875-6.701,2.632
			c-1.75,1.738-2.625,3.984-2.625,6.689v55.937c0,2.717,0.875,4.951,2.625,6.689C260.806,89.566,263.04,90.441,265.756,90.441z"/>
		<path d="M265.756,196.733h130.49c2.718,0,4.951-0.875,6.702-2.619c1.75-1.75,2.619-3.984,2.619-6.702v-55.924
			c0-2.717-0.875-4.963-2.619-6.702c-1.751-1.75-3.984-2.625-6.702-2.625h-130.49c-2.724,0-4.951,0.875-6.701,2.625
			c-1.75,1.738-2.625,3.984-2.625,6.702v55.924c0,2.717,0.875,4.951,2.625,6.702C260.806,195.858,263.04,196.733,265.756,196.733z"
			/>
		<path d="M265.756,303.025h186.415c2.718,0,4.951-0.875,6.701-2.619c1.744-1.75,2.62-3.984,2.62-6.701V237.78
			c0-2.717-0.876-4.951-2.62-6.701c-1.75-1.75-3.983-2.62-6.701-2.62H265.756c-2.724,0-4.951,0.863-6.701,2.62
			c-1.75,1.75-2.625,3.984-2.625,6.701v55.925c0,2.717,0.875,4.951,2.625,6.701C260.806,302.15,263.04,303.025,265.756,303.025z"/>
		<path d="M265.756,409.318h242.346c2.718,0,4.951-0.863,6.701-2.613c1.751-1.75,2.62-3.984,2.62-6.701v-55.926
			c0-2.717-0.876-4.951-2.62-6.701c-1.75-1.738-3.983-2.619-6.701-2.619H265.756c-2.724,0-4.951,0.875-6.701,2.619
			c-1.75,1.75-2.625,3.984-2.625,6.701v55.926c0,2.717,0.875,4.951,2.625,6.701C260.806,408.455,263.04,409.318,265.756,409.318z"/>
	</g>
</g>

</svg>
                <span>Sort Descending</span>
            </button>
            <button part=sort-asc class=sort-asc aria-label="Sort ascending">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="16" height="16" fill="#CD138F"  viewBox="0 0 96.55 96.55" style="enable-background:new 0 0 96.55 96.55;" xml:space="preserve"
                >
                <g>
                    <g>
                        <path d="M73.901,56.376h-26.76c-0.652,0-1.182,0.526-1.182,1.181v14.065c0,0.651,0.529,1.18,1.182,1.18h26.76
                            c0.654,0,1.184-0.526,1.184-1.18V57.555C75.084,56.902,74.555,56.376,73.901,56.376z"/>
                        <path d="M62.262,80.001H47.141c-0.652,0-1.182,0.528-1.182,1.183v14.063c0,0.653,0.529,1.182,1.182,1.182h15.122
                            c0.652,0,1.182-0.526,1.182-1.182V81.182C63.444,80.529,62.916,80.001,62.262,80.001z"/>
                        <path d="M84.122,28.251h-36.98c-0.652,0-1.182,0.527-1.182,1.18v14.063c0,0.652,0.529,1.182,1.182,1.182h36.98
                            c0.651,0,1.181-0.529,1.181-1.182V29.43C85.301,28.778,84.773,28.251,84.122,28.251z"/>
                        <path d="M94.338,0.122H47.141c-0.652,0-1.182,0.529-1.182,1.182v14.063c0,0.654,0.529,1.182,1.182,1.182h47.198
                            c0.652,0,1.181-0.527,1.181-1.182V1.303C95.519,0.651,94.992,0.122,94.338,0.122z"/>
                        <path d="M39.183,65.595h-8.011V2c0-1.105-0.896-2-2-2h-16.13c-1.104,0-2,0.895-2,2v63.595h-8.01c-0.771,0-1.472,0.443-1.804,1.138
                            C0.895,67.427,0.99,68.25,1.472,68.85l18.076,26.954c0.38,0.474,0.953,0.746,1.559,0.746s1.178-0.272,1.558-0.746L40.741,68.85
                            c0.482-0.601,0.578-1.423,0.245-2.117C40.654,66.039,39.954,65.595,39.183,65.595z"/>
                    </g>
                </g>
            </svg>
            <span>Sort Ascending</span>
            </button>
            <button part=clone-node class=clone-node aria-label="Clone node">
                <svg
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:cc="http://creativecommons.org/ns#"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:svg="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                width="16"
                height="16"
                fill="#CD138F" 
                viewBox="0 0 448 448"
                id="svg2"
                version="1.1"
                inkscape:version="0.91 r13725"
                sodipodi:docname="clone.svg">
                <title
                    id="title3347">clone</title>
                <defs
                    id="defs4" />
                <sodipodi:namedview
                    id="base"
                    pagecolor="#ffffff"
                    bordercolor="#666666"
                    borderopacity="1.0"
                    inkscape:pageopacity="0.0"
                    inkscape:pageshadow="2"
                    inkscape:zoom="0.7"
                    inkscape:cx="83.19264"
                    inkscape:cy="244.19737"
                    inkscape:document-units="px"
                    inkscape:current-layer="layer1"
                    showgrid="true"
                    fit-margin-top="448"
                    fit-margin-right="384"
                    fit-margin-left="0"
                    fit-margin-bottom="0"
                    units="px"
                    inkscape:window-width="1196"
                    inkscape:window-height="852"
                    inkscape:window-x="590"
                    inkscape:window-y="442"
                    inkscape:window-maximized="0"
                    inkscape:snap-bbox="true"
                    inkscape:bbox-nodes="true">
                    <inkscape:grid
                    type="xygrid"
                    id="grid3347"
                    spacingx="16"
                    spacingy="16"
                    empspacing="2"
                    originx="0"
                    originy="-1.7498462e-005" />
                </sodipodi:namedview>
                <metadata
                    id="metadata7">
                    <rdf:RDF>
                    <cc:Work
                        rdf:about="">
                        <dc:format>image/svg+xml</dc:format>
                        <dc:type
                        rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                        <dc:title>clone</dc:title>
                    </cc:Work>
                    </rdf:RDF>
                </metadata>
                <g
                    inkscape:label="Layer 1"
                    inkscape:groupmode="layer"
                    id="layer1"
                    transform="translate(0,-604.36224)">
                    <path
                    style="fill-opacity:1;stroke:none"
                    d="M 0 0 L 0 320 L 96 320 L 96 288 L 32 288 L 32 32 L 288 32 L 288 96 L 320 96 L 320 0 L 0 0 z "
                    transform="translate(0,604.36224)"
                    id="rect3334" />
                    <path
                    style="fill-opacity:1;stroke:none"
                    d="M 128 128 L 128 448 L 448 448 L 448 128 L 128 128 z M 160 160 L 416 160 L 416 416 L 160 416 L 160 160 z "
                    transform="translate(0,604.36224)"
                    id="rect3336" />
                </g>
                </svg>
                <span>Clone this section</span>
            </button>
        </xtal-side-nav>
        <style adopt>
            xtal-side-nav {
                display: inline-block;
            }

            xtal-side-nav:not(:--mounted) * {
                display: none;
            }

            xtal-side-nav::part(opener){
                font-size:8pt;
            }
            xtal-side-nav::part(side-nav){
                position:absolute;
            }

            xtal-side-nav[open] template[be-lazy], xtal-side-nav[open] template[is-lazy]{
                display:block;
                height: 30px;
            }
        </style>
        <be-hive></be-hive>
    </template>
    <!---->
</be-dendroid-menu>
                `,
                menuBDConfig: {
                    config:{
                        propDefaults:{
                            styles: {

                            }
                        }
                    }
                }
            }
        },
        actions: {
            defineMenu: 'menuMarkup'
        }
    },
    complexPropDefaults:{
        controller: BeDendroid
    }
});

register(ifWantsToBe, upgrade, tagName);
