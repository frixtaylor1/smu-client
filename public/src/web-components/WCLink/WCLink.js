class WCLink extends HTMLAnchorElement {
    constructor(path, label) {
        super();
        this.#path = path;
        if (path && label) {
            this.href = path;
            this.innerHTML = label;
            this.addEventListener('click', (event) => {
                event.preventDefault();
                window.document.querySelector('x-router').navigate(path);
            });
        }
    }

    connectedCallback() {
        this.#enableCallbacks();
    }

    static GetName() {
        return 'x-link';
    }

    #enableCallbacks() {
        if (!this.#path.includes("#")) {
            return ;
        }

        this.onclick = () => {
            const element = document.getElementById(this.#path.substring(2));
            element.scrollIntoView();
        }
    }

    #path = undefined;
}

customElements.define(WCLink.GetName(), WCLink, { extends: 'a' });

export { WCLink };
