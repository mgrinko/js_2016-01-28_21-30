'use strict';

let menus = document.querySelectorAll('[data-component="menu"]');

[].forEach.call(menus, function(menuEl) {
  let myMenu = new Menu({
    element: menuEl,
    title: menuEl.dataset.title,
    items: menuEl.dataset.items.split(',')
  });
});



