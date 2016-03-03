'use strict';

var data = {
  "Рыбы": {
    "Форель": {},
    "Щука": {}
  },

  "Деревья": {
    "Хвойные": {
      "Лиственница": {},
      "Ель": {}
    },
    "Цветковые": {
      "Берёза": {},
      "Тополь": {}
    }

  }
};


new Tree({
  element: document.getElementById('container1'),
  data: data
});

new Tree({
  element: document.getElementById('container2'),
  data: data['Рыбы']
});

new Tree({
  element: document.getElementById('container3'),
  data: data['Деревья']
});