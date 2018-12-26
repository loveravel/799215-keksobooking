'use strict';

(function () {
  window.util = {
    NUMBER_OF_NOTICES: 5,
    MAP: document.querySelector('.map'),
    MAIN_PIN: document.querySelector('.map__pin--main'),
    FILTERS_CONTAINER: document.querySelector('.map__filters-container'),
    FORM: document.querySelector('.ad-form'),
    ESC_KEYCODE: 27,
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
    },
    clearMap: function () {
      var pinListAfterRender = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var cardListAfterRender = document.querySelectorAll('.map__card');
      for (var i = 0; i < pinListAfterRender.length; i++) {
        pinListAfterRender[i].remove();
        cardListAfterRender[i].remove();
      }
    }
  };
})();
