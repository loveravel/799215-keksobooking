'use strict';

(function () {
  var MAIN_PIN_WIDTH = 60;
  var MAIN_PIN_HEIGHT = 80;
  var MIN_X = 0;
  var MAX_X = 1200 - MAIN_PIN_WIDTH;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var ESC_KEYCODE = 27;

  function getFilterList() {
    var allFilterList = [];
    allFilterList.push(document.querySelectorAll('.ad-form-header input'));
    allFilterList.push(document.querySelectorAll('.ad-form__element select'));
    allFilterList.push(document.querySelectorAll('.ad-form__element input'));
    allFilterList.push(document.querySelectorAll('.ad-form__element textarea'));
    allFilterList.push(document.querySelectorAll('.map__filters select'));
    allFilterList.push(document.querySelectorAll('.map__filters input'));
    return allFilterList;
  }

  function disableFilterList() {
    var allFilterList = getFilterList();
    for (var i = 0; i < allFilterList.length; i++) {
      for (var j = 0; j < allFilterList[i].length; j++) {
        allFilterList[i][j].disabled = true;
      }
    }
  }

  function enableFilterList() {
    var allFilterList = getFilterList();
    for (var i = 0; i < allFilterList.length; i++) {
      for (var j = 0; j < allFilterList[i].length; j++) {
        allFilterList[i][j].disabled = false;
      }
    }
  }

  disableFilterList();

  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');

  var onMainPinClick = function () {
    window.constants.MAP.classList.remove('map--faded');
    if (document.querySelectorAll('.map__pin').length === 1) {
      window.pin();
      window.card();
      enableFilterList();
    }
    form.classList.remove('ad-form--disabled');

    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cardList = document.querySelectorAll('.map__card');
    var closeCardButtonList = document.querySelectorAll('.popup__close');
    var onPinClick = function (pin, card, closeCardButton) {
      pin.addEventListener('click', function () {
        checkOpenedCard();
        pin.classList.add('map__pin--active');
        card.classList.remove('hidden');
        onCloseCardButtonClick(pin, card, closeCardButton);
        onCardEscPress(pin, card);
      });
    };
    var closeCard = function (pin, card) {
      pin.classList.remove('map__pin--active');
      card.classList.add('hidden');
      document.removeEventListener('keydown', onCardEscPress);
    };
    var onCloseCardButtonClick = function (pin, card, closeCardButton) {
      closeCardButton.addEventListener('click', function () {
        closeCard(pin, card);
      });
    };
    var onCardEscPress = function (pin, card) {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closeCard(pin, card);
        }
      });
    };
    var checkOpenedCard = function () {
      var activePin = document.querySelector('.map__pin--active');
      var openedCard = document.querySelector('.map__card:not(.hidden)');
      if (activePin) {
        closeCard(activePin, openedCard);
      }
    };
    for (var i = 0; i < pinList.length; i++) {
      onPinClick(pinList[i], cardList[i], closeCardButtonList[i]);
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinateList = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var limits = {
        top: MIN_Y,
        left: MIN_X,
        bottom: MAX_Y,
        right: MAX_X
      };

      var shift = {
        x: startCoordinateList.x - moveEvt.clientX,
        y: startCoordinateList.y - moveEvt.clientY
      };

      startCoordinateList = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinTop = mainPin.offsetTop - shift.y;
      var mainPinLeft = mainPin.offsetLeft - shift.x;

      if (mainPinLeft < limits.left) {
        mainPinLeft = limits.left;
      } else if (mainPinLeft > limits.right) {
        mainPinLeft = limits.right;
      }

      if (mainPinTop < limits.top) {
        mainPinTop = limits.top;
      } else if (mainPinTop > limits.bottom) {
        mainPinTop = limits.bottom;
      }

      mainPin.style.top = mainPinTop + 'px';
      mainPin.style.left = mainPinLeft + 'px';
      autoCompleteAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      onMainPinClick();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function autoCompleteAddress() {
    var inputAddress = document.querySelector('#address');
    inputAddress.disabled = true;
    inputAddress.value = (+mainPin.style.left.substr(0, mainPin.style.left.length - 2) + MAIN_PIN_WIDTH / 2)
      + ', ' + (+mainPin.style.top.substr(0, mainPin.style.top.length - 2) + MAIN_PIN_HEIGHT);
  }
})();
