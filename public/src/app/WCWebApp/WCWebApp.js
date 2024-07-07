import { createElement } from "../../web-components/WCUtility/DomUtility.js";
import { WCRouter } from "../../web-components/WCRouter/WCRouter.js";
import { WCLink } from "../../web-components/WCLink/WCLink.js";

const EMPLOYEES_PATH =    '/';
const CONTRACTS_PATH =    '/contracts';
const DEPARTMENTS_PATH = '/departments'; 

class WCSideBarSections extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.#enableCallbacks();
    this.#render();
  }
  disconnectedCallback() {
    this.#disableCallbacks();    
  }

  static GetName() {
    return 'x-side-bar-sections';
  }

  #render() {
    this.appendChild(this.#sections());
  }

  #enableCallbacks() {}
  #disableCallbacks() {}

  #sections() {
    return createElement('nav', {
      class: 'x-side-nav-bar',
      child: createElement('ul', {
        child: [
          createElement('li', {
            child: createElement('a', { href: EMPLOYEES_PATH, innerText: 'Employees' })
          }),
          createElement('li', {
            child: createElement('a', { href: CONTRACTS_PATH, innerText: 'Contracts' })
          }),
          createElement('li', {
            child: createElement('a', { href: DEPARTMENTS_PATH, innerText: 'Departamentos' })
          })
        ]
      })
    });
  }
}
customElements.define(WCSideBarSections.GetName(), WCSideBarSections, { extends: 'aside' });


class WCDashBoar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.#enableCallbacks();
    this.#render(); 
  }

  disconnectedCallback() {
    this.#disableCallbacks();  
  }

  static GetName() {
    return 'x-web-app-dashboard-resume';
  }

  #enableCallbacks() {}

  #disableCallbacks() {}

  #render() {
    this.appendChild(this.#sideBarSections());
    this.appendChild(this.#executiveSummary());
    this.appendChild(this.#notifications());
    this.appendChild(this.#graphs());
  }

  #sideBarSections() {
    return new WCSideBarSections();
  }
  
  #executiveSummary() {
    return createElement('div', {
      child: [
        createElement('h3', { innerText: "Executive Summary" }),
        createElement('div', { 
          child: [
            createElement('div', { innerText: 'Total Employees' }),
            createElement('div', { innerText: 'New hires' }),
            createElement('div', { innerText: 'Employment terminations' })  
          ] 
        }) 
      ]
    });
  }

  #notifications() {
    return createElement('div', {
      child: [
        createElement('h3', { innerText: 'News!' })
      ]
    })  
  }

  #graphs() {
    return createElement('div', {
      child: [
        createElement('h3', { innerText: 'Graphs' })
      ]
    })
  }
};
customElements.define('x-web-app-dashboard', WCDashBoar);

class WCWebApp extends HTMLElement {
  constructor() {
    super();
    this.#initialize();
  }

  connectedCallback() {
    this.#enableCallbacks();
    this.#render();
  }

  disconnectedCallback() {
    this.#disableCallbacks();
  }

  static GetName() {
    return 'x-web-app';
  }

  /* Private Members... */

  #enableCallbacks() { }

  #disableCallbacks() { }

  /* Initializations... */

  #initialize() {}

  /* Renderizations... */

  #render() {
    this.appendChild(this.#router());
  }

  #router() {
    const router = new WCRouter();
    router.addRoute(EMPLOYEES_PATH, new WCDashBoar());   
    router.addRoute(CONTRACTS_PATH, new WCLink(EMPLOYEES_PATH, '<') );
    return router;
  }
}
customElements.define(WCWebApp.GetName(), WCWebApp);

export { WCWebApp };
