import { createElement } from "../WCUtility/DomUtility.js";

class WCDataTable extends HTMLElement {
  constructor({ fetchCallback, columns }) {
    super();     
    this.#fetchCallback = fetchCallback;
    this.#columns = columns;

    this.#thead = createElement('thead');
    this.#tbody = createElement('tbody');
    this.#table = createElement('table', {
      child: [
        this.#thead,
        this.#tbody
      ]
    });
  }

  connectedCallback() {
    this.#render();
  }

  setConfig({ columns, fetchFunction }) {
    this.#columns = columns;
    this.#fetchCallback = fetchFunction;
    this.#renderHeaders();
    this.#loadData();
  }

  async setQuery(query = '') {
    await this.#loadData(query);
  }

  async #loadData(query = '') {
    if (this.#fetchCallback) {
      try {
        this.#data = await this.#fetchCallback(query);
        this.#renderRows();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  #renderHeaders() {
    // Clear existing headers
    this.#thead.innerHTML = '';

    const row = createElement('tr', {
      child: this.#columns.map(column =>
        createElement('th', {
          innerText: column.header,
          onclick: () => { this.sortData(column.accessor, column.sorter) }
        })
      )
    });
    this.#thead.appendChild(row);
  }

  #renderRows() {
    // Clear existing rows
    this.#tbody.innerHTML = '';

    this.#data.forEach(rowData => {
      const row = createElement('tr', {
        child: this.#columns.map(column =>
          createElement('td', { innerText: rowData[column.accessor] })
        )
      });
      this.#tbody.appendChild(row);
    });
  }

  sortData(accessor, sorter) {
    if (sorter) {
      this.#data.sort((a, b) => {
        if (a[accessor] > b[accessor]) return 1;
        if (a[accessor] < b[accessor]) return -1;
        return 0;
      });
      this.#renderRows();
    }
  }

  #render() {
    this.appendChild(this.#table);
    this.#renderHeaders();
    this.#loadData();
  }

  #fetchCallback;
  #data = [];
  #columns = [];
  #table = undefined;
  #thead = undefined;
  #tbody = undefined;
}

// Define the new element
customElements.define('x-data-table', WCDataTable);

export { WCDataTable }
