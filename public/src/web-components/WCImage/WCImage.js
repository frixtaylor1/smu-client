class WCImage extends HTMLImageElement {
    constructor(className, path) {
        super();
        this.#path      = path;
        this.#className = className;
        this.#initialize();
    }

    connectedCallback() {
        this.#enableCallbacks();
    }

    disconnectedCallback() {
        this.#disableCallbacks();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'path' && oldValue !== newValue) {
            this.#path = newValue;
        }
    }

    #onMouseOver() {
        this.classList.add('img-hover');
    }

    #onMouseLeave() {
        this.classList.remove('img-hover');
    }

    #initialize() {
        this.className      = this.#className;
        this.src            = this.#path;
        this.style.width    = '100%';
        this.style.height   = '100%';
    }

    #enableCallbacks() {
        this.addEventListener('mouseover',  () => { this.#onMouseOver(); });
        this.addEventListener('mouseleave', () => { this.#onMouseLeave(); });
    }

    #disableCallbacks() {
        this.addEventListener('mouseover', null);
        this.addEventListener('mouseleave', null);
    }

    #className;
    #path;
}
customElements.define('x-img', WCImage, { extends: 'img' });

export { WCImage };