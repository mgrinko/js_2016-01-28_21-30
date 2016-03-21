'use strict';

let Component = require('./component.js');
let templateFunction = require('../templates/phone-catalogue-template.hbs');

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._el.innerHTML = templateFunction({
      title: 'Phone Catalogue',
      phones: options.phones
    });

    this._el.addEventListener('click', this._onPhoneClick.bind(this));
  }

  _onPhoneClick(event) {
    let link = event.target.closest('[data-selector="openTrigger"]');

    if (!link) {
      return;
    }

    let phoneId = link.closest('[data-selector="phoneItemContainer"]').dataset.phoneId;

    this._trigger('phoneSelected', phoneId);
  }
}

module.exports = PhoneCatalogue;
