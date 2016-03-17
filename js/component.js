'use strict';

class Component {
  constructor(options) {
    this._el = options.element;
  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  hide() {
    this._el.classList.add('js-hidden');
  }

  on(eventName, handler) {
    this._el.addEventListener(eventName, handler);
  }

  _trigger(eventName, data, options) {
    options = options || {};

    if (data != undefined) {
      options.detail = data;
    }

    var event = new CustomEvent(eventName, options);

    this._el.dispatchEvent(event);
  }
}
