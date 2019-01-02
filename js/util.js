'use strict';

(function () {
  window.util = {
    NUMBER_OF_NOTICES: 5,
    MAP: document.querySelector('.map'),
    MAIN_PIN: document.querySelector('.map__pin--main'),
    FILTERS_CONTAINER: document.querySelector('.map__filters-container'),
    FORM: document.querySelector('.ad-form'),
    ESC_KEYCODE: 27,
    DEBOUNCE_INTERVAL: 500,
    PATH_TO_DEFAULT_AVATAR: 'img/avatars/default.png',
    getFilterList: function () {
      var filterList = [];
      filterList.push(document.querySelectorAll('.ad-form-header input'));
      filterList.push(document.querySelectorAll('.ad-form__element select'));
      filterList.push(document.querySelectorAll('.ad-form__element input:not(#address)'));
      filterList.push(document.querySelectorAll('.ad-form__element textarea'));
      filterList.push(document.querySelectorAll('.map__filters select'));
      filterList.push(document.querySelectorAll('.map__filters input'));
      filterList.push(document.querySelectorAll('.ad-form__element button'));
      return filterList;
    },
    disableFilterList: function (bool) {
      var filterList = this.getFilterList();
      for (var i = 0; i < filterList.length; i++) {
        for (var j = 0; j < filterList[i].length; j++) {
          filterList[i][j].disabled = bool;
        }
      }
    },
    autoCompleteAddress: function (element, width, height) {
      var inputAddress = document.querySelector('#address');
      inputAddress.readOnly = true;
      inputAddress.value = (+element.style.left.substr(0, element.style.left.length - 2) + width / 2)
        + ', ' + (+element.style.top.substr(0, element.style.top.length - 2) + height);
    },
    clearMap: function () {
      var pinListAfterRender = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var cardListAfterRender = document.querySelectorAll('.map__card');
      for (var i = 0; i < pinListAfterRender.length; i++) {
        pinListAfterRender[i].remove();
        cardListAfterRender[i].remove();
      }
    },
    debounce: function (cb) {
      var _this = this;
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, _this.DEBOUNCE_INTERVAL);
      };
    }
  };
})();
