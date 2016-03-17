'use strict';

class Component {
  constructor(options) {
    this._el = options.element;
  }

  getElement() {
    return this._el;
  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  hide() {
    this._el.classList.add('js-hidden');
  }
}