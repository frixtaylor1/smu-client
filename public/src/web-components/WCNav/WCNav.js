import { createElement } from "../WCUtility/Domutility.js";
import { WCLink } from "../WCLink/WCLink.js";

class WCNav extends HTMLElement {
    constructor() {
        super();
        this.#initialize();
    }

    connectedCallback() {
        this.#render();
    }

    push(link) {
        const li = createElement('li', { child: link });
        this.#ul.appendChild(li);
    }

    async #initialize() {
        this.#ul = createElement('ul');
    }

    get links() {
        return Array.from(this.#ul.childNodes);
    }

    #render() {
        this.appendChild(this.#ul);

        Array.from(this.children).forEach(child => {
            if (child.tagName === 'A' && child.getAttribute('is') === WCLink.GetName()) {
                this.push(child);
            }
        });
    }

    #ul;
}
customElements.define('x-nav', WCNav, { extends: 'nav' });

export { WCNav };