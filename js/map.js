'use strict';

// Отвечает за отрисовку меток и карт объявлений на карте
// Получает данные от cardMaker и pinMaker

(function () {
  var MainPin = {
    ELEMENT: document.querySelector('.map__pin--main'),
    WIDTH: 60,
    HEIGHT: 80,
    MIN_X: 0,
    MIN_Y: 130,
    MAX_X: 1200,
    MAX_Y: 630
  };

  var onLoad = function (options) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.util.NUMBER_OF_NOTICES; i++) {
      fragment.appendChild(window.pinMaker(options[i]));
      fragment.appendChild(window.cardMaker(options[i]));
    }

    window.util.MAP.insertBefore(fragment, window.util.FILTERS_CONTAINER);
  };

  var onError = function () {
    return '';
  };

  var onMainPinClick = function () {
    window.util.MAP.classList.remove('map--faded');
    if (document.querySelectorAll('.map__pin').length === 1) {
      window.backend.load(onLoad, onError);
      window.util.disableFilterList(false);
    }
    window.util.FORM.classList.remove('ad-form--disabled');

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
        if (evt.keyCode === window.util.ESC_KEYCODE) {
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

  MainPin.ELEMENT.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinateList = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var limits = {
        top: MainPin.MIN_Y,
        left: MainPin.MIN_X,
        bottom: MainPin.MAX_Y,
        right: MainPin.MAX_X
      };

      var shift = {
        x: startCoordinateList.x - moveEvt.clientX,
        y: startCoordinateList.y - moveEvt.clientY
      };

      startCoordinateList = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinTop = MainPin.ELEMENT.offsetTop - shift.y;
      var mainPinLeft = MainPin.ELEMENT.offsetLeft - shift.x;

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

      MainPin.ELEMENT.style.top = mainPinTop + 'px';
      MainPin.ELEMENT.style.left = mainPinLeft + 'px';
      window.util.autoCompleteAddress(MainPin.ELEMENT, MainPin.WIDTH, MainPin.HEIGHT);
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

})();
