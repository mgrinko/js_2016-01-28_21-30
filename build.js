/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Page = __webpack_require__(1);
	
	var myPage = new Page({
	  element: document.getElementById('app-container')
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PhoneCatalogue = __webpack_require__(2);
	var PhoneViewer = __webpack_require__(4);
	
	var Page = function () {
	  function Page(options) {
	    _classCallCheck(this, Page);
	
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
	
	  _createClass(Page, [{
	    key: '_onPhoneSelected',
	    value: function _onPhoneSelected(event) {
	      var phoneId = event.detail;
	      var phoneDetails = this._getPhoneDetails(phoneId);
	
	      this._phoneViewer.show(phoneDetails);
	      this._phoneCatalogue.hide();
	    }
	  }, {
	    key: '_onPhoneViewerBack',
	    value: function _onPhoneViewerBack() {
	      this._phoneViewer.hide();
	      this._phoneCatalogue.show();
	    }
	  }, {
	    key: '_getPhones',
	    value: function _getPhones() {
	      return phones;
	    }
	  }, {
	    key: '_getPhoneDetails',
	    value: function _getPhoneDetails(phoneId) {
	      return phones.filter(function (phone) {
	        return phone.id === phoneId;
	      })[0];
	    }
	  }]);
	
	  return Page;
	}();
	
	module.exports = Page;
	
	var phones = __webpack_require__(5);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Component = __webpack_require__(3);
	
	var PhoneCatalogue = function (_Component) {
	  _inherits(PhoneCatalogue, _Component);
	
	  function PhoneCatalogue(options) {
	    _classCallCheck(this, PhoneCatalogue);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PhoneCatalogue).call(this, options));
	
	    _this._template = document.getElementById('phone-catalogue-template').innerHTML;
	
	    _this._el.innerHTML = _.template(_this._template)({
	      title: 'Phone Catalogue',
	      phones: options.phones
	    });
	
	    _this._el.addEventListener('click', _this._onPhoneClick.bind(_this));
	    return _this;
	  }
	
	  _createClass(PhoneCatalogue, [{
	    key: '_onPhoneClick',
	    value: function _onPhoneClick(event) {
	      var link = event.target.closest('[data-selector="openTrigger"]');
	
	      if (!link) {
	        return;
	      }
	
	      var phoneId = link.closest('[data-selector="phoneItemContainer"]').dataset.phoneId;
	
	      this._trigger('phoneSelected', phoneId);
	    }
	  }]);
	
	  return PhoneCatalogue;
	}(Component);
	
	module.exports = PhoneCatalogue;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Component = function () {
	  function Component(options) {
	    _classCallCheck(this, Component);
	
	    this._el = options.element;
	  }
	
	  _createClass(Component, [{
	    key: 'show',
	    value: function show() {
	      this._el.classList.remove('js-hidden');
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this._el.classList.add('js-hidden');
	    }
	  }, {
	    key: 'on',
	    value: function on(eventName, handler) {
	      this._el.addEventListener(eventName, handler);
	    }
	  }, {
	    key: '_trigger',
	    value: function _trigger(eventName, data, options) {
	      options = options || {};
	
	      if (data != undefined) {
	        options.detail = data;
	      }
	
	      var event = new CustomEvent(eventName, options);
	
	      this._el.dispatchEvent(event);
	    }
	  }]);
	
	  return Component;
	}();
	
	module.exports = Component;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Component = __webpack_require__(3);
	
	var PhoneViewer = function (_Component) {
	  _inherits(PhoneViewer, _Component);
	
	  function PhoneViewer(options) {
	    _classCallCheck(this, PhoneViewer);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PhoneViewer).call(this, options));
	
	    _this._el = options.element;
	    _this._template = document.getElementById('phone-viewer-template').innerHTML;
	
	    _this._el.addEventListener('click', _this._onBackClick.bind(_this));
	    return _this;
	  }
	
	  _createClass(PhoneViewer, [{
	    key: 'show',
	    value: function show(phone) {
	      this._el.innerHTML = _.template(this._template)({
	        phone: phone
	      });
	
	      _get(Object.getPrototypeOf(PhoneViewer.prototype), 'show', this).call(this);
	    }
	  }, {
	    key: '_onBackClick',
	    value: function _onBackClick(event) {
	      var backButton = event.target.closest('[data-selector="backButton"]');
	
	      if (!backButton) {
	        return;
	      }
	
	      this._trigger('back');
	    }
	  }]);
	
	  return PhoneViewer;
	}(Component);
	
	module.exports = PhoneViewer;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = [
		{
			"age": 0,
			"id": "motorola-xoom-with-wi-fi",
			"imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
			"name": "Motorola XOOM™ with Wi-Fi",
			"snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
		},
		{
			"age": 1,
			"id": "motorola-xoom",
			"imageUrl": "img/phones/motorola-xoom.0.jpg",
			"name": "MOTOROLA XOOM™",
			"snippet": "The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."
		},
		{
			"age": 2,
			"carrier": "AT&T",
			"id": "motorola-atrix-4g",
			"imageUrl": "img/phones/motorola-atrix-4g.0.jpg",
			"name": "MOTOROLA ATRIX™ 4G",
			"snippet": "MOTOROLA ATRIX 4G the world's most powerful smartphone."
		},
		{
			"age": 3,
			"id": "dell-streak-7",
			"imageUrl": "img/phones/dell-streak-7.0.jpg",
			"name": "Dell Streak 7",
			"snippet": "Introducing Dell™ Streak 7. Share photos, videos and movies together. It’s small enough to carry around, big enough to gather around."
		},
		{
			"age": 4,
			"carrier": "Cellular South",
			"id": "samsung-gem",
			"imageUrl": "img/phones/samsung-gem.0.jpg",
			"name": "Samsung Gem™",
			"snippet": "The Samsung Gem™ brings you everything that you would expect and more from a touch display smart phone – more apps, more features and a more affordable price."
		},
		{
			"age": 5,
			"carrier": "Dell",
			"id": "dell-venue",
			"imageUrl": "img/phones/dell-venue.0.jpg",
			"name": "Dell Venue",
			"snippet": "The Dell Venue; Your Personal Express Lane to Everything"
		},
		{
			"age": 6,
			"carrier": "Best Buy",
			"id": "nexus-s",
			"imageUrl": "img/phones/nexus-s.0.jpg",
			"name": "Nexus S",
			"snippet": "Fast just got faster with Nexus S. A pure Google experience, Nexus S is the first phone to run Gingerbread (Android 2.3), the fastest version of Android yet."
		},
		{
			"age": 7,
			"carrier": "Cellular South",
			"id": "lg-axis",
			"imageUrl": "img/phones/lg-axis.0.jpg",
			"name": "LG Axis",
			"snippet": "Android Powered, Google Maps Navigation, 5 Customizable Home Screens"
		},
		{
			"age": 8,
			"id": "samsung-galaxy-tab",
			"imageUrl": "img/phones/samsung-galaxy-tab.0.jpg",
			"name": "Samsung Galaxy Tab™",
			"snippet": "Feel Free to Tab™. The Samsung Galaxy Tab™ brings you an ultra-mobile entertainment experience through its 7” display, high-power processor and Adobe® Flash® Player compatibility."
		},
		{
			"age": 9,
			"carrier": "Cellular South",
			"id": "samsung-showcase-a-galaxy-s-phone",
			"imageUrl": "img/phones/samsung-showcase-a-galaxy-s-phone.0.jpg",
			"name": "Samsung Showcase™ a Galaxy S™ phone",
			"snippet": "The Samsung Showcase™ delivers a cinema quality experience like you’ve never seen before. Its innovative 4” touch display technology provides rich picture brilliance, even outdoors"
		},
		{
			"age": 10,
			"carrier": "Verizon",
			"id": "droid-2-global-by-motorola",
			"imageUrl": "img/phones/droid-2-global-by-motorola.0.jpg",
			"name": "DROID™ 2 Global by Motorola",
			"snippet": "The first smartphone with a 1.2 GHz processor and global capabilities."
		},
		{
			"age": 11,
			"carrier": "Verizon",
			"id": "droid-pro-by-motorola",
			"imageUrl": "img/phones/droid-pro-by-motorola.0.jpg",
			"name": "DROID™ Pro by Motorola",
			"snippet": "The next generation of DOES."
		},
		{
			"age": 12,
			"carrier": "AT&T",
			"id": "motorola-bravo-with-motoblur",
			"imageUrl": "img/phones/motorola-bravo-with-motoblur.0.jpg",
			"name": "MOTOROLA BRAVO™ with MOTOBLUR™",
			"snippet": "An experience to cheer about."
		},
		{
			"age": 13,
			"carrier": "T-Mobile",
			"id": "motorola-defy-with-motoblur",
			"imageUrl": "img/phones/motorola-defy-with-motoblur.0.jpg",
			"name": "Motorola DEFY™ with MOTOBLUR™",
			"snippet": "Are you ready for everything life throws your way?"
		},
		{
			"age": 14,
			"carrier": "T-Mobile",
			"id": "t-mobile-mytouch-4g",
			"imageUrl": "img/phones/t-mobile-mytouch-4g.0.jpg",
			"name": "T-Mobile myTouch 4G",
			"snippet": "The T-Mobile myTouch 4G is a premium smartphone designed to deliver blazing fast 4G speeds so that you can video chat from practically anywhere, with or without Wi-Fi."
		},
		{
			"age": 15,
			"carrier": "US Cellular",
			"id": "samsung-mesmerize-a-galaxy-s-phone",
			"imageUrl": "img/phones/samsung-mesmerize-a-galaxy-s-phone.0.jpg",
			"name": "Samsung Mesmerize™ a Galaxy S™ phone",
			"snippet": "The Samsung Mesmerize™ delivers a cinema quality experience like you’ve never seen before. Its innovative 4” touch display technology provides rich picture brilliance,even outdoors"
		},
		{
			"age": 16,
			"carrier": "Sprint",
			"id": "sanyo-zio",
			"imageUrl": "img/phones/sanyo-zio.0.jpg",
			"name": "SANYO ZIO",
			"snippet": "The Sanyo Zio by Kyocera is an Android smartphone with a combination of ultra-sleek styling, strong performance and unprecedented value."
		},
		{
			"age": 17,
			"id": "samsung-transform",
			"imageUrl": "img/phones/samsung-transform.0.jpg",
			"name": "Samsung Transform™",
			"snippet": "The Samsung Transform™ brings you a fun way to customize your Android powered touch screen phone to just the way you like it through your favorite themed “Sprint ID Service Pack”."
		},
		{
			"age": 18,
			"id": "t-mobile-g2",
			"imageUrl": "img/phones/t-mobile-g2.0.jpg",
			"name": "T-Mobile G2",
			"snippet": "The T-Mobile G2 with Google is the first smartphone built for 4G speeds on T-Mobile's new network. Get the information you need, faster than you ever thought possible."
		},
		{
			"age": 19,
			"id": "motorola-charm-with-motoblur",
			"imageUrl": "img/phones/motorola-charm-with-motoblur.0.jpg",
			"name": "Motorola CHARM™ with MOTOBLUR™",
			"snippet": "Motorola CHARM fits easily in your pocket or palm.  Includes MOTOBLUR service."
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map