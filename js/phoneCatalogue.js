'use strict';

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;

    this._template = document.getElementById('phone-catalogue-template').innerHTML;

    this._el.innerHTML = _.template(this._template)({
      title: 'Phone Catalogue',
      phones: options.phones
    });
  }

}