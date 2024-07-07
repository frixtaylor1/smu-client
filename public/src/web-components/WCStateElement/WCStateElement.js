
class WCStateElement extends HTMLElement {
    #transitions  = new Map();
    #currentState = null;
    
    constructor() {
      super();
      this.#transitions = new Map();
      this.#currentState = null;
    }
  
    addStateTransition(currentStateObject, nextStateObject, event) {
      if (!this.#transitions.has(currentStateObject)) {
        this.#transitions.set(currentStateObject, new Map());
      }
  
      const eventMap = this.#transitions.get(currentStateObject);
  
      if (!eventMap.has(event)) {
        eventMap.set(event, nextStateObject);
        currentStateObject.addEventListener(event, this.#oneventraised.bind(this));
      }
      else {
        return null;
      }
    }
  
    removeStateTransition(currentStateObject, nextStateObject, event) {
      if (this.#transitions.has(currentStateObject)) {
        const eventMap = this.#transitions.get(currentStateObject);
        if (eventMap.has(event) && eventMap.get(event) === nextStateObject) {
          eventMap.delete(event);
          currentStateObject.removeEventListener(event, this.#oneventraised);
        }
      }
    }
  
    setCurrentState(stateObject) {
      if (this.#currentState !== stateObject) {
        if (this.#currentState !== null) {
          this.removeChild(this.#currentState);
        }
  
        this.#currentState = stateObject;
  
        if (this.#currentState !== null) {
          this.appendChild(this.#currentState);
        }
      }
    }
  
    getCurrentState() {
      return this.#currentState;
    }
  
    queryNextState(event) {
      if (this.#transitions.has(this.#currentState)) {
        const eventMap = this.#transitions.get(this.#currentState);
  
        if (eventMap.has(event)) {
          return eventMap.get(event);
        }
      }
      return null;
    }
  
    pushEvent(event) {
      const nextState = this.queryNextState(event.type);
  
      if (nextState !== null) {
        this.setCurrentState(nextState);
      }
    }

    #oneventraised(event) {
      const nextState = this.queryNextState(event.type);
      if (nextState !== null) {
        this.setCurrentState(nextState);
      }
    }
  }
  customElements.define('x-state', WCStateElement);
  
  export { WCStateElement };
