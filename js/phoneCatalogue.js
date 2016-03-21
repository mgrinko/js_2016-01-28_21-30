'use strict';

let Component = require('./component.js');

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._template = document.getElementById('phone-catalogue-template').innerHTML;

    this._el.innerHTML = _.template(this._template)({
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
