'use strict';

let Component = require('./component.js');
let templateFunction = require('../templates/phone-catalogue-template.hbs');

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._phones = [];

    this._el.addEventListener('click', this._onPhoneClick.bind(this));
  }

  _onPhoneClick(event) {
    let link = event.target.closest('[data-selector="openTrigger"]');

    if (!link) {
      return;
    }

    let element = link.closest('[data-selector="phoneItemContainer"]');

    this._trigger('phoneSelected', {
      phoneElement: element,
      phoneId: element.dataset.phoneId
    });
  }

  show(phones) {
    if (phones) {
      this._phones = phones;
    }

    this._el.innerHTML = templateFunction({
      title: 'Phone Catalogue',
      phones: this._phones
    });

    super.show();
  }
}

module.exports = PhoneCatalogue;
