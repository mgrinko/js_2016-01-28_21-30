'use strict';

let PhoneCatalogue = require('./phoneCatalogue.js');
let PhoneViewer = require('./phoneViewer.js');
let Filter = require('./filter.js');

class Page {
  constructor(options) {
    this._el = options.element;

    this._phoneCatalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._syncPhones();

    this._phoneViewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._phoneCatalogue.on('phoneSelected', this._onPhoneSelected.bind(this));
    this._phoneViewer.on('back', this._onPhoneViewerBack.bind(this));
    this._filter.on('filter', this._onFilterChange.bind(this));
  }

  _onFilterChange(event) {
    let query = event.detail.toLowerCase();

    // server filtering
    //this._syncPhones(query);

    let filteredPhones = this._phones.filter(function(phone) {
      return phone.name.toLowerCase().indexOf(query) > -1
        || phone.snippet.toLowerCase().indexOf(query) > -1;

    });

    this._phoneCatalogue.show(filteredPhones);
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;

    this._showPhoneDetails(phoneId);
  }

  _showPhoneDetails(phoneId) {
    this.ajax(`/data/phones/${phoneId}.json`, {
      success: this._onPhoneDetailsLoaded.bind(this),
      error: this._onAjaxError.bind(this)
    });
  }

  _onPhoneDetailsLoaded(phoneDetails) {
    this._phoneViewer.show(phoneDetails);
    this._phoneCatalogue.hide();
  }

  _onPhoneViewerBack() {
    this._phoneViewer.hide();
    this._phoneCatalogue.show();
  }

  _syncPhones(query) {
    let url = '/data/phones.json';

    if (query) {
      url += `?query=${query}`;
    }

    this.ajax(url, {
      success: this._onPhonesSyncSuccess.bind(this),
      error: this._onAjaxError.bind(this)
    });
  }

  _onPhonesSyncSuccess(phones) {
    this._phones = phones;
    this._phoneCatalogue.show(phones);
  }

  ajax(url, options) {
    let method = options.method || 'GET';

    let xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);

      options.success(data);
    };

    xhr.onerror = function() {
      options.error(new Error(xhr.responseText));
    };

    xhr.send();
  }

  _onAjaxError(error) {
    console.error(error);
  }
}

module.exports = Page;
