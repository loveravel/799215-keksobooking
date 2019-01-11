'use strict';

(function () {
  var MAP_BOX = window.util.MAP.getBoundingClientRect();

  var MainPin = {
    ELEMENT: document.querySelector('.map__pin--main'),
    WIDTH: 60,
    HEIGHT: 80,
    MIN_X: -30,
    MIN_Y: 50,
    MAX_X: 1170,
    MAX_Y: 550,
    START_X: 570,
    START_Y: 375
  };

  var MapFilter = {
    HOUSING_LIST: document.querySelectorAll('.map__filter'),
    HOUSING_TYPE: document.querySelector('#housing-type'),
    HOUSING_PRICE: document.querySelector('#housing-price'),
    HOUSING_ROOMS: document.querySelector('#housing-rooms'),
    HOUSING_GUESTS: document.querySelector('#housing-guests'),
    FEATURE_LIST: document.querySelectorAll('.map__features input'),
  };

  var priceLevel = {
    LOW: 10000,
    HIGH: 50000
  };

  window.util.autoCompleteAddress(MainPin.ELEMENT, MainPin.WIDTH, MainPin.HEIGHT);
  window.util.disableFilterList(true);

  function doHousingFilter(noticeList) {
    if (MapFilter.HOUSING_ROOMS.value !== 'any') {
      noticeList.filter(function (notice) {
        return notice.offer.rooms.toString() === MapFilter.HOUSING_ROOMS.value;
      });
    }

    if (MapFilter.HOUSING_TYPE.value !== 'any') {
      noticeList.filter(function (notice) {
        return notice.offer.type === MapFilter.HOUSING_TYPE.value;
      });
    }

    if (MapFilter.HOUSING_GUESTS.value !== 'any') {
      noticeList.filter(function (notice) {
        return notice.offer.guests.toString() === MapFilter.HOUSING_GUESTS.value;
      });
    }

    if (MapFilter.HOUSING_PRICE.value === 'low') {
      noticeList.filter(function (notice) {
        return notice.offer.price < priceLevel.LOW;
      });
    } else if (MapFilter.HOUSING_PRICE.value === 'middle') {
      noticeList.filter(function (notice) {
        return notice.offer.price >= priceLevel.LOW && notice.offer.price < priceLevel.HIGH;
      });
    } else if (MapFilter.HOUSING_PRICE.value === 'high') {
      noticeList.filter(function (notice) {
        return notice.offer.price >= priceLevel.HIGH;
      });
    }
  }

  function doFeatureFilter(notice, feature) {
    var bool = false;
    for (var i = 0; i < notice.offer.features.length; i++) {
      bool = (notice.offer.features[i] === feature);
      if (bool) {
        break;
      }
    }
    return bool;
  }

  function checkFeatureFilter(noticeList, feature, featureId) {
    if (feature.checked) {
      noticeList.filter(function (notice) {
        return doFeatureFilter(notice, featureId);
      });
    }
  }

  var noticeList = [];

  function onLoad(data) {
    noticeList = data;

    var elementList = window.map.renderElements(noticeList);

    function updateMap() {
      window.util.clearMap();
      var updateNoticeList = noticeList;

      doHousingFilter(updateNoticeList);

      MapFilter.FEATURE_LIST.forEach(function (item) {
        checkFeatureFilter(updateNoticeList, item, item.value);
      });

      if (updateNoticeList) {
        elementList = window.map.renderElements(updateNoticeList);
      }

      makeListenerListForPinList(elementList.pinList, elementList.cardList);
    }

    MapFilter.FEATURE_LIST.forEach(function (item) {
      item.addEventListener('click', window.util.debounce(function () {
        updateMap(noticeList);
      }));
    });
    MapFilter.HOUSING_LIST.forEach(function (item) {
      item.addEventListener('change', window.util.debounce(function () {
        updateMap(noticeList);
      }));
    });

    function onPinClick(pin, card, closeCardButton) {
      pin.addEventListener('click', function () {
        checkOpenedCard();
        pin.classList.add('map__pin--active');
        card.classList.remove('hidden');
        onCloseCardButtonClick(pin, card, closeCardButton);
        onCardEscPress(pin, card);
      });
    }

    function closeCard(pin, card) {
      pin.classList.remove('map__pin--active');
      card.classList.add('hidden');
      document.removeEventListener('keydown', onCardEscPress);
    }

    function onCloseCardButtonClick(pin, card, closeCardButton) {
      closeCardButton.addEventListener('click', function () {
        closeCard(pin, card);
      });
    }

    function onCardEscPress(pin, card) {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          closeCard(pin, card);
        }
      });
    }

    function checkOpenedCard() {
      var activePin = document.querySelector('.map__pin--active');
      var openedCard = document.querySelector('.map__card:not(.hidden)');
      if (activePin) {
        closeCard(activePin, openedCard);
      }
    }

    function makeListenerListForPinList(pinListAfterRender, cardListAfterRender) {
      var closeCardButtonList = document.querySelectorAll('.popup__close');

      pinListAfterRender.forEach(function (item, i) {
        onPinClick(pinListAfterRender[i], cardListAfterRender[i], closeCardButtonList[i]);
      });
    }

    makeListenerListForPinList(elementList.pinList, elementList.cardList);
  }

  function onMainPinClick() {
    window.util.MAP.classList.remove('map--faded');
    window.util.FORM.classList.remove('ad-form--disabled');
    window.util.disableFilterList(false);
    if (document.querySelectorAll('.map__pin').length === 1) {
      window.backend.load(onLoad, window.backend.onError);
    }
  }

  MainPin.ELEMENT.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinateList = {
      x: evt.pageX,
      y: evt.pageY
    };

    function onMouseMove(moveEvt) {
      var shift = {
        x: startCoordinateList.x - moveEvt.pageX,
        y: startCoordinateList.y - moveEvt.pageY
      };

      startCoordinateList = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      var mainPinTop = MainPin.ELEMENT.offsetTop - shift.y;
      var mainPinLeft = MainPin.ELEMENT.offsetLeft - shift.x;

      if (moveEvt.pageX < MAP_BOX.left || mainPinLeft < MainPin.MIN_X) {
        mainPinLeft = MainPin.MIN_X;
      } else if (moveEvt.pageX > MAP_BOX.right || mainPinLeft > MainPin.MAX_X) {
        mainPinLeft = MainPin.MAX_X;
      }

      if (moveEvt.pageY < MainPin.MIN_Y || mainPinTop < MainPin.MIN_Y) {
        mainPinTop = MainPin.MIN_Y;
      } else if (moveEvt.pageY > MainPin.MAX_Y || mainPinTop > MainPin.MAX_Y) {
        mainPinTop = MainPin.MAX_Y;
      }

      MainPin.ELEMENT.style.top = mainPinTop + 'px';
      MainPin.ELEMENT.style.left = mainPinLeft + 'px';
      window.util.autoCompleteAddress(MainPin.ELEMENT, MainPin.WIDTH, MainPin.HEIGHT);

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      onMainPinClick();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    reset: function () {
      window.util.disableFilterList(true);
      window.util.MAP.classList.add('map--faded');
      window.util.FORM.classList.add('ad-form--disabled');
      MainPin.ELEMENT.style.top = MainPin.START_Y + 'px';
      MainPin.ELEMENT.style.left = MainPin.START_X + 'px';
      window.util.FORM.reset();
      window.util.autoCompleteAddress(MainPin.ELEMENT, MainPin.WIDTH, MainPin.HEIGHT);
      window.util.clearMap();
    },
    renderElements: function (notice) {
      var elementList = {
        pinList: [],
        cardList: []
      };
      var pinList = window.pinMaker(notice);
      var cardList = window.cardMaker(notice);
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < notice.length; i++) {
        if (i === window.util.NUMBER_OF_NOTICES) {
          break;
        }
        elementList.pinList.push(pinList[i]);
        fragment.appendChild(pinList[i]);
        elementList.cardList.push(cardList[i]);
        fragment.appendChild(cardList[i]);
      }

      window.util.MAP.insertBefore(fragment, window.util.FILTERS_CONTAINER);
      return elementList;
    }
  };
})();
