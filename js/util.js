'use strict';

(function () {
  window.util = {
    NUMBER_OF_NOTICES: 8,
    MAP: document.querySelector('.map'),
    MAIN_PIN: document.querySelector('.map__pin--main'),
    FILTERS_CONTAINER: document.querySelector('.map__filters-container'),
    FORM: document.querySelector('.ad-form'),
    ESC_KEYCODE: 27,
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        action();
      }
    },
    getRandomInteger: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    getRandomArray: function (arr, n) {
      var result = new Array(n);
      var len = arr.length;
      var taken = new Array(len);
      if (n > len) {
        throw new RangeError('getRandomArray: more elements taken than available');
      }
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result.sort();
    },
    OptionCard: {
      TITLE_LIST: [
        'Большая уютная квартира',
        'Маленькая неуютная квартира',
        'Огромный прекрасный дворец',
        'Маленький ужасный дворец',
        'Красивый гостевой домик',
        'Некрасивый негостеприимный домик',
        'Уютное бунгало далеко от моря',
        'Неуютное бунгало по колено в воде'
      ],
      TYPE_LIST: [
        'palace',
        'flat',
        'house',
        'bungalo'
      ],
      CHECKIN_LIST: [
        '12:00',
        '13:00',
        '14:00'
      ],
      CHECKOUT_LIST: [
        '12:00',
        '13:00',
        '14:00'
      ],
      FEATURES_LIST: [
        'wifi',
        'dishwasher',
        'parking',
        'washer',
        'elevator',
        'conditioner'
      ],
      DESCRIPTION_LIST: ''
    },
    getFilterList: function () {
      var filterList = [];
      filterList.push(document.querySelectorAll('.ad-form-header input'));
      filterList.push(document.querySelectorAll('.ad-form__element select'));
      filterList.push(document.querySelectorAll('.ad-form__element input'));
      filterList.push(document.querySelectorAll('.ad-form__element textarea'));
      filterList.push(document.querySelectorAll('.map__filters select'));
      filterList.push(document.querySelectorAll('.map__filters input'));
      return filterList;
    },
    disableFilterList: function (bool) {
      var filterList = window.util.getFilterList();
      for (var i = 0; i < filterList.length; i++) {
        for (var j = 0; j < filterList[i].length; j++) {
          filterList[i][j].disabled = bool;
        }
      }
    },
    autoCompleteAddress: function (element, width, height) {
      var inputAddress = document.querySelector('#address');
      inputAddress.disabled = true;
      inputAddress.value = (+element.style.left.substr(0, element.style.left.length - 2) + width / 2)
        + ', ' + (+element.style.top.substr(0, element.style.top.length - 2) + height);
    }
    /* insertElementList: function (element, amountElements, whereInsert, beforeWhat) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < amountElements; i++) {
        fragment.appendChild(element);
      }
      whereInsert.insertBefore(fragment, beforeWhat);
    }*/
  };
})();
