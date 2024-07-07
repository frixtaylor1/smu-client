import { createElement } from "../WCUtility/DomUtility.js";

class WCRouter extends HTMLElement {
  #routerOutlet;
  
  constructor() {
    super();
    this.routes = {};
    this.#routerOutlet = createElement('div');
  }

  connectedCallback() {
    this.initialize();
  }

  addRoute(path, component) {
    this.routes[path] = component;
  }

  initialize() {
    window.addEventListener('popstate', this.#handleRouteChange.bind(this));
    document.body.appendChild(this.#routerOutlet);
    this.#handleRouteChange();
  }

  navigate(path) {
    history.pushState({}, '', path);
    this.#handleRouteChange();
  }

  #handleRouteChange() {
    this.#routerOutlet.innerHTML = '';
    const path      = window.location.pathname;
    const component = this.routes[path] || this.routes['/'];
    this.#routerOutlet.appendChild(component);
  }
}

customElements.define('x-router', WCRouter);

export { WCRouter };
