'use strict';

let PhoneCatalogue = require('./phoneCatalogue.js');
let PhoneViewer = require('./phoneViewer.js');

class Page {
  constructor(options) {
    this._el = options.element;

    this._phoneCatalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]'),
      phones: this._getPhones()
    });

    this._phoneViewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._phoneCatalogue.on('phoneSelected', this._onPhoneSelected.bind(this));
    this._phoneViewer.on('back', this._onPhoneViewerBack.bind(this));
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;
    let phoneDetails = this._getPhoneDetails(phoneId);

    this._phoneViewer.show(phoneDetails);
    this._phoneCatalogue.hide();
  }

  _onPhoneViewerBack() {
    this._phoneViewer.hide();
    this._phoneCatalogue.show();
  }

  _getPhones() {
    return phones;
  }

  _getPhoneDetails(phoneId) {
    return phones.filter(function(phone) {
      return phone.id === phoneId;
    })[0];
  }
}

module.exports = Page;

let phones = require('json!../data/phones.json');