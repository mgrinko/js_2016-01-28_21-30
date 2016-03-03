'use strict';

class Tree {
  constructor(options) {
    this._el = options.element;

    this._el.appendChild(this._createTreeDom( options.data ));
  }

  _onItemClick(event) {
    console.log(this);
    alert(this._el.textContent);
  }

  _createTreeDom(obj) {

    if (this._isObjectEmpty(obj)) {
      return document.createTextNode('');
    }

    let ul = document.createElement('ul');

    for (let key in obj) {
      let li = document.createElement('li');
      let span = document.createElement('span');

      span.innerHTML = key;
      span.classList.add('list-element');

      li.onclick = this._onItemClick.bind(this);
      // span.onclick({ target: span })


      li.appendChild( span );
      li.appendChild( this._createTreeDom(obj[key]) );

      ul.appendChild(li);
    }

    return ul;
  }


  _isObjectEmpty(obj) {
    for (let key in obj) {
      return false;
    }

    return true;
  }
}