/**
 * Creates an CustomEvent by name and data
 * 
 * @param String name
 * @param Object data
 * 
 * @return `CustomEvent`
 */
function createEvent(name, data) {
  return new CustomEvent(name, { bubbles: true, cancelable: true, detail: data });
}

const RENDERIZABLE_IMAGE_SVG = ['image', 'svg', 'rect', 'circle', 'g'];
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';

/**
 * Creates an HTMLElement by tagname and options.
 * 
 * @param {String} tagName - The name of the tag to create.
 * @param {Object} [options={}] - Options for creating the element.
 * 
 * @returns {HTMLElement} The created element.
 */
function createElement(tagName, options = {}) {
  const { innerText, textContent, innerHTML, href, state, child, customEvent, ...attributes } = options;
  const element = document.createElement(tagName);

  if (state) element.state = state;
  _setTextContent(element, { innerText, textContent, innerHTML });
  _setHrefAttribute(element, tagName, href);
  _setAttributes(element, attributes);
  _setCustomEvent(element, customEvent);
  _appendChildren(element, child);

  return element;
}

function _setTextContent(el, { innerText, textContent, innerHTML }) {
  if (innerText) el.textContent = innerText;
  if (textContent) el.textContent = textContent;
  if (innerHTML) el.innerHTML = innerHTML;
}

function _setHrefAttribute(el, tagName, href) {
  if (href) {
    if (tagName === 'image') {
      el.setAttributeNS(XLINK_NAMESPACE, 'href', href);
    } else if (tagName === 'a') {
      el.setAttribute('href', href);
    }
  }
}

function _appendChildren(el, child) {
  if (child) {
    if (Array.isArray(child)) {
      child.forEach(c => {
        if (c instanceof Node) {
          el.appendChild(c);
        } else {
          console.warn('Child is not a valid Node:', c);
        }
      });
    } else if (child instanceof Node) {
      el.appendChild(child);
    } else {
      console.warn('Child is not a valid Node:', child);
    }
  }
}

function _setCustomEvent(el, customEvent) {
  if (customEvent) {
    el.addEventListener(customEvent.name, customEvent.callback);
  }
}

function _setAttributes(el, attr) {
  const { eventListeners, normalAttr } = _separateAttributes(attr);

  Object.entries(normalAttr).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });

  Object.entries(eventListeners).forEach(([key, value]) => {
    el.addEventListener(key.slice(2), value);
  });
}

function _separateAttributes(attr) {
  const eventListeners = {};
  const normalAttr = {};

  Object.entries(attr).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      eventListeners[key.toLowerCase()] = value;
    } else {
      normalAttr[key] = value;
    }
  });

  return { eventListeners, normalAttr };
}

/** 
 * Imports a Css file
 *
 * @param String cssFileName
 * 
 * @return HTMLStyleElement
 */
function styleChildren(cssFileName) {
  let style = createElement('style');
  style.innerText = `@import '${cssFileName}';`;
  return style;
}

export { createEvent, createElement, styleChildren };
