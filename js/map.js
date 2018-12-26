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

  var MapFilter = {
    HOUSING_TYPE: document.querySelector('#housing-type'),
    HOUSING_PRICE: document.querySelector('#housing-price'),
    HOUSING_ROOMS: document.querySelector('#housing-rooms'),
    HOUSING_GUESTS: document.querySelector('#housing-guests'),
    FEATURE_WIFI: document.querySelector('#filter-wifi'),
    FEATURE_DISHWASHER: document.querySelector('#filter-dishwasher'),
    FEATURE_PARKING: document.querySelector('#filter-parking'),
    FEATURE_WASHER: document.querySelector('#filter-washer'),
    FEATURE_ELEVATOR: document.querySelector('#filter-elevator'),
    FEATURE_CONDITIONER: document.querySelector('#filter-conditioner')
  };

  window.util.autoCompleteAddress(MainPin.ELEMENT, MainPin.WIDTH, MainPin.HEIGHT);
  window.util.disableFilterList(true);

  var noticeList = [];

  var onLoad = function (data) {
    noticeList = data;

    window.map.renderElements(noticeList);

    var pinListAfterRender = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cardListAfterRender = document.querySelectorAll('.map__card');
    var closeCardButtonList = document.querySelectorAll('.popup__close');

    function updateMap() {
      window.util.clearMap();
      updateNoticeList = noticeList;

      if (MapFilter.HOUSING_ROOMS.value !== 'any') {
        var updateNoticeList = updateNoticeList.filter(function (notice) {
          return notice.offer.rooms.toString() === MapFilter.HOUSING_ROOMS.value;
        });
      }

      if (MapFilter.HOUSING_TYPE.value !== 'any') {
        updateNoticeList = updateNoticeList.filter(function (notice) {
          return notice.offer.type === MapFilter.HOUSING_TYPE.value;
        });
      }

      if (MapFilter.HOUSING_GUESTS.value !== 'any') {
        updateNoticeList = updateNoticeList.filter(function (notice) {
          return notice.offer.guests.toString() === MapFilter.HOUSING_GUESTS.value;
        });
      }

      if (MapFilter.HOUSING_PRICE.value === 'low') {
        updateNoticeList = updateNoticeList.filter(function (notice) {
          return notice.offer.price < 10000;
        });
      } else if (MapFilter.HOUSING_PRICE.value === 'middle') {
        updateNoticeList = updateNoticeList.filter(function (notice) {
          return notice.offer.price >= 10000 && notice.offer.price < 50000;
        });
      } else if (MapFilter.HOUSING_PRICE.value === 'high') {
        updateNoticeList = updateNoticeList.filter(function (notice) {
          return notice.offer.price >= 50000;
        });
      }

      if (updateNoticeList) {
        window.map.renderElements(updateNoticeList);
      }
    }

    MapFilter.FEATURE_WIFI.addEventListener('click', function () {
      updateMap(noticeList);
    });
    MapFilter.FEATURE_DISHWASHER.addEventListener('click', function () {
      updateMap(noticeList);
    });
    MapFilter.FEATURE_PARKING.addEventListener('click', function () {
      updateMap(noticeList);
    });
    MapFilter.FEATURE_WASHER.addEventListener('click', function () {
      updateMap(noticeList);
    });
    MapFilter.FEATURE_ELEVATOR.addEventListener('click', function () {
      updateMap(noticeList);
    });
    MapFilter.FEATURE_CONDITIONER.addEventListener('click', function () {
      updateMap(noticeList);
    });
    MapFilter.HOUSING_TYPE.addEventListener('change', function () {
      updateMap(noticeList);
    });
    MapFilter.HOUSING_PRICE.addEventListener('change', function () {
      updateMap(noticeList);
    });
    MapFilter.HOUSING_ROOMS.addEventListener('change', function () {
      updateMap(noticeList);
    });
    MapFilter.HOUSING_GUESTS.addEventListener('change', function () {
      updateMap(noticeList);
    });

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

    for (var i = 0; i < pinListAfterRender.length; i++) {
      onPinClick(pinListAfterRender[i], cardListAfterRender[i], closeCardButtonList[i]);
    }
  };

  var onMainPinClick = function () {
    window.util.MAP.classList.remove('map--faded');
    window.util.FORM.classList.remove('ad-form--disabled');
    window.util.disableFilterList(false);
    if (document.querySelectorAll('.map__pin').length === 1) {
      window.backend.load(onLoad, window.backend.onError);
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

  window.map = {
    reset: function () {
      window.util.disableFilterList(true);
      window.util.MAP.classList.add('map--faded');
      window.util.FORM.classList.add('ad-form--disabled');
      MainPin.ELEMENT.style.top = 375 + 'px';
      MainPin.ELEMENT.style.left = 570 + 'px';
      window.util.autoCompleteAddress(MainPin.ELEMENT, MainPin.WIDTH, MainPin.HEIGHT);
      document.querySelector('#title').value = '';
      document.querySelector('#price').value = '';
      document.querySelector('#type').value = 'flat';
      document.querySelector('#timein').value = '12:00';
      document.querySelector('#timeout').value = '12:00';
      document.querySelector('#room_number').value = '1';
      document.querySelector('#capacity').value = '1';
      document.querySelector('#description').value = '';
      window.util.clearMap();
    },
    renderElements: function (notice) {
      console.log(notice);
      var cardList = window.cardMaker(notice);
      var pinList = window.pinMaker(notice);
      var fragment = document.createDocumentFragment();

      /*if (notice.length > window.util.NUMBER_OF_NOTICES) {
        notice.length = window.util.NUMBER_OF_NOTICES;
      }*/

      for (var i = 0; i < notice.length; i++) {
        fragment.appendChild(cardList[i]);
        fragment.appendChild(pinList[i]);
      }

      window.util.MAP.insertBefore(fragment, window.util.FILTERS_CONTAINER);
    }
  };
})();
