'use strict';

(function () {
  window.data = {
    NUMBER_OF_NOTICES: 8,
    MAP: document.querySelector('.map'),
    FILTERS_CONTAINER: document.querySelector('.map__filters-container'),
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
    }
  };
})();
