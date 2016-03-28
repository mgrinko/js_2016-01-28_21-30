'use strict';

class PromiseExample {
  constructor(f) {
    this._successCallBacks = [];
    this._errorCallBacks = [];

    this._status = 'pending';

    f(this._resolve.bind(this), this._reject.bind(this));
  }

  then(success, error) {
    this._successCallBacks.push(success);
    this._errorCallBacks.push(success);

    if (this._status === 'fulfilled') {
      this._runSuccessCallbacks(this._data);
    }

    if (this._status === 'rejected') {
      this._runErrorCallbacks(this._error);
    }
  }

  _resolve(data) {
    this._status = 'fulfilled';
    this._data = data;
    this._runSuccessCallbacks(data);
  }

  _reject(error) {
    this._status = 'rejected';
    this._error = error
    this._runErrorCallbacks(error);
  }
}

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

  _onPhoneSelected(event) {
    let phoneId = event.detail.phoneId;
    let phoneElement = event.detail.phoneElement;

    let phoneDetailsPromise = this.ajax(`/data/phones/${phoneId}.json`);
    let mouseLeavePromise = this._createMouseLeavePromise(phoneElement);

    Promise.all([mouseLeavePromise, phoneDetailsPromise])
      .then(function(responses) {
        this._showPhoneDetails(responses[1])
      }.bind(this))

      .catch(this._onAjaxError.bind(this));

    //phoneElement.addEventListener('mouseleave', () => {
    //  this.ajax(`/data/phones/${phoneId}.json`, {
    //    success: this._onPhoneDetailsLoaded.bind(this),
    //    error: this._onAjaxError.bind(this)
    //  });
    //});
  }

  _createMouseLeavePromise(element) {
    return new Promise(function(resolve) {
      element.addEventListener('mouseleave', mouseLeaveHandler);

      function mouseLeaveHandler(event) {
        resolve();
        element.removeEventListener('mouseleave', mouseLeaveHandler);
      }
    });
  }

  _showPhoneDetails(phoneDetails) {
    this._phoneViewer.show(phoneDetails);
    this._phoneCatalogue.hide();
  }

  _onPhoneViewerBack() {
    this._phoneViewer.hide();
    this._phoneCatalogue.show();
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

  _syncPhones(query) {
    let url = '/data/phones.json';

    if (query) {
      url += `?query=${query}`;
    }

    this.ajax(url)
      .then(this._onPhonesSyncSuccess.bind(this))
      .catch(this._onAjaxError.bind(this));
  }

  _onPhonesSyncSuccess(phones) {
    this._phones = phones;
    this._phoneCatalogue.show(phones);
  }

  ajax(url, options) {
    options = options || {};

    let promise = new Promise(function(resolve, reject) {
      let method = options.method || 'GET';

      let xhr = new XMLHttpRequest();

      xhr.open(method, url, true);

      xhr.onload = function() {
        if (xhr.status !== 200) {
          reject(new Error(xhr.responseText));

          return;
        }

        var data = JSON.parse(xhr.responseText);

        //options.success(data);
        resolve(data);
      };

      xhr.onerror = function() {
        //options.error(new Error(xhr.responseText));
        reject(new Error(xhr.responseText));
      };

      xhr.send();
    });

    return promise;
  }

  _onAjaxError(error) {
    console.error(error);
  }
}

module.exports = Page;
