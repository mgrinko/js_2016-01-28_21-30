'use strict';

let Component = require('./component.js');

class Filter extends Component {
  constructor(options) {
    super(options);

    this._filed = this._el.querySelector('[data-component="filterField"]');

    this._filed.oninput = this._onFieldInput.bind(this);
  }

  getValue() {
    return this._filed.value;
  }

  _onFieldInput() {
    this._trigger('filter', this.getValue());
  }
}

module.exports = Filter;