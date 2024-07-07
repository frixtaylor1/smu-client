class WCForm extends HTMLFormElement {
    constructor(method) {
      super();
      this.method = method;
    }
  
    removeByName(name) {
      this.removeChild(this.elements[name]);
    }

    onSubmit(callback) {
        this.addEventListener('submit', (event) => { callback(event); });
    }

    getData() {
        const formData = new FormData(this);
        return Object.fromEntries(formData.entries());
    }

    getDataAsString() {
        return JSON.stringify(this.getData()); 
    }
  
    static GetName() {
      return 'x-form';
    }
  }
  customElements.define(WCForm.GetName(), WCForm, { extends: 'form' });
  
  export { WCForm };
  