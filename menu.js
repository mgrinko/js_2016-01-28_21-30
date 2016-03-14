'use strict';

var template = document.getElementById('menu-template').innerHTML;

class Menu {
  constructor(options) {
    this._el = options.element;

    this._el.innerHTML = _.template(template)({
      title: options.title,
      items: options.items
    });

    this._el.onclick = this._onTitleClick.bind(this);
  }

  _onTitleClick(event) {
    var title = event.target.closest('.menu__title');

    if (!title) {
      return;
    }

    this.toggle();
  }

  toggle() {
    this._el.classList.toggle('menu_open')
  }
}

/*
function Menu(options) {
  this._el = options.element;

  this._el.onclick = this._onTitleClick.bind(this);
}

Menu.prototype._onTitleClick = function(event) {
  var title = event.target.closest('.menu__title');

  if (!title) {
    return;
  }

  this.toggle();
};

Menu.prototype.toggle = function() {
  this._el.classList.toggle('menu_open')
};*/
