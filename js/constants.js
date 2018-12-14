'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function Author(avatar) {
    this.avatar = avatar;
  }

  function Offer(title, address, price, type, rooms, guests, checkin, checkout, features, description, photos) {
    this.title = title;
    this.address = address;
    this.price = price;
    this.type = type;
    this.rooms = rooms;
    this.guests = guests;
    this.checkin = checkin;
    this.checkout = checkout;
    this.features = features;
    this.description = description;
    this.photos = photos;
  }

  function Location(x, y) {
    this.x = x;
    this.y = y;
  }

  function getArrayWithNumbers(startNumber, endNumber) {
    var arr = [];
    for (startNumber; startNumber <= endNumber; startNumber++) {
      arr.push(startNumber);
    }
    return arr;
  }

  function getPathToAvatar(index) {
    return 'img/avatars/user0' + index + '.png';
  }

  function getLocation() {
    return {
      x: window.util.getRandomInteger(PIN_WIDTH / 2, 1200 - PIN_WIDTH / 2),
      y: window.util.getRandomInteger(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
    };
  }

  function getAddress(location) {
    return (location.x + PIN_WIDTH / 2) + ', ' + (location.y + PIN_HEIGHT);
  }

  function getFeatures(arr) {
    return window.util.getRandomArray(arr, window.util.getRandomInteger(1, 5));
  }

  function getPhotosArray() {
    var photos = [];
    for (var i = 0; i < 3; i++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
    }
    photos = window.util.getRandomArray(photos, window.util.getRandomInteger(1, 3));
    return photos;
  }

  var getAuthorOptionList = function () {
    var authorOptionList = [];
    var arr = window.util.getRandomArray(getArrayWithNumbers(1, window.util.NUMBER_OF_NOTICES), window.util.NUMBER_OF_NOTICES);
    for (var i = 0; i < arr.length; i++) {
      authorOptionList.push(new Author(getPathToAvatar(arr[i])));
    }
    return authorOptionList;
  };

  var getOfferOptionList = function () {
    var offerOptionList = [];
    for (var i = 0; i < window.util.NUMBER_OF_NOTICES; i++) {
      offerOptionList.push(new Offer(
        window.util.OptionCard.TITLE_LIST[window.util.getRandomInteger(0, 7)],
        getAddress(locationOptionList[i]),
        window.util.getRandomInteger(1000, 1000000),
        window.util.OptionCard.TYPE_LIST[window.util.getRandomInteger(0, window.util.OptionCard.TYPE_LIST.length - 1)],
        window.util.getRandomInteger(1, 5),
        window.util.getRandomInteger(1, 10),
        window.util.OptionCard.CHECKIN_LIST[window.util.getRandomInteger(0, window.util.OptionCard.CHECKIN_LIST.length - 1)],
        window.util.OptionCard.CHECKOUT_LIST[window.util.getRandomInteger(0, window.util.OptionCard.CHECKOUT_LIST.length - 1)],
        getFeatures(window.util.OptionCard.FEATURES_LIST),
        window.util.OptionCard.DESCRIPTION_LIST,
        getPhotosArray()));
    }
    return offerOptionList;
  };

  var getLocationOptionList = function () {
    var locationOptionList = [];
    for (var i = 0; i < window.util.NUMBER_OF_NOTICES; i++) {
      locationOptionList.push(new Location(
        getLocation().x,
        getLocation().y));
    }
    return locationOptionList;
  };

  function renderCard(author, offer) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.classList.add('hidden');
    cardElement.querySelector('.popup__avatar').src = author.avatar;
    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнат(ы) для '
      + offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin
      + ', выезд до ' + offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    for (var featureIndex = 0; featureIndex < offer.features.length; featureIndex++) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + offer.features[featureIndex];
      cardElement.querySelector('.popup__features').appendChild(featureElement);
    }
    cardElement.querySelector('.popup__description').textContent = offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    for (var photoIndex = 0; photoIndex < offer.photos.length; photoIndex++) {
      var photoElement = document.createElement('img');
      photoElement.className = 'popup__photo';
      photoElement.src = offer.photos[photoIndex];
      photoElement.width = 45;
      photoElement.height = 40;
      photoElement.alt = 'Фотография жилья';
      cardElement.querySelector('.popup__photos').appendChild(photoElement);
    }
    return cardElement;
  }

  function renderMapPin(author, offer, location) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = location.x + 'px';
    mapPinElement.style.top = location.y + 'px';
    mapPinElement.querySelector('img').src = author.avatar;
    mapPinElement.querySelector('img').alt = offer.title;
    return mapPinElement;
  }

  var authorOptionList = getAuthorOptionList();
  var locationOptionList = getLocationOptionList();
  var offerOptionList = getOfferOptionList();

  window.mapElements = {
    pin: renderMapPin,
    card: renderCard,
    authorOptionList: authorOptionList,
    locationOptionList: locationOptionList,
    offerOptionList: offerOptionList
  };
})();



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

  window.backend.get(function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.NUMBER_OF_NOTICES; i++) {
      fragment.appendChild(
        window.mapElements.pin(
          window.mapElements.authorOptionList[i],
          window.mapElements.offerOptionList[i],
          window.mapElements.locationOptionList[i]));
    }
    window.data.MAP.insertBefore(fragment, window.data.FILTERS_CONTAINER);
  });

  function insertMapPinList() {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.NUMBER_OF_NOTICES; i++) {
      fragment.appendChild(
        window.mapElements.pin(
          window.mapElements.authorOptionList[i],
          window.mapElements.offerOptionList[i],
          window.mapElements.locationOptionList[i]));
    }
    window.data.MAP.insertBefore(fragment, window.data.FILTERS_CONTAINER);
  }
  function insertCardList() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.NUMBER_OF_NOTICES; i++) {
      fragment.appendChild(window.mapElements.card(
        window.mapElements.authorOptionList[i],
        window.mapElements.offerOptionList[i]));
    }
    window.data.MAP.insertBefore(fragment, window.data.FILTERS_CONTAINER);
  }
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');

  var onMainPinClick = function () {
    window.data.MAP.classList.remove('map--faded');
    if (document.querySelectorAll('.map__pin').length === 1) {
      insertMapPinList();
      insertCardList();
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
