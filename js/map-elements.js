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
      x: window.data.getRandomInteger(PIN_WIDTH / 2, 1200 - PIN_WIDTH / 2),
      y: window.data.getRandomInteger(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
    };
  }

  function getAddress(location) {
    return (location.x + PIN_WIDTH / 2) + ', ' + (location.y + PIN_HEIGHT);
  }

  function getFeatures(arr) {
    return window.data.getRandomArray(arr, window.data.getRandomInteger(1, 5));
  }

  function getPhotosArray() {
    var photos = [];
    for (var i = 0; i < 3; i++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
    }
    photos = window.data.getRandomArray(photos, window.data.getRandomInteger(1, 3));
    return photos;
  }

  var getAuthorOptionList = function () {
    var authorOptionList = [];
    var arr = window.data.getRandomArray(getArrayWithNumbers(1, window.data.NUMBER_OF_NOTICES), window.data.NUMBER_OF_NOTICES);
    for (var i = 0; i < arr.length; i++) {
      authorOptionList.push(new Author(getPathToAvatar(arr[i])));
    }
    return authorOptionList;
  };

  var getOfferOptionList = function () {
    var offerOptionList = [];
    for (var i = 0; i < window.data.NUMBER_OF_NOTICES; i++) {
      offerOptionList.push(new Offer(
          window.data.OptionCard.TITLE_LIST[window.data.getRandomInteger(0, 7)],
          getAddress(locationOptionList[i]),
          window.data.getRandomInteger(1000, 1000000),
          window.data.OptionCard.TYPE_LIST[window.data.getRandomInteger(0, window.data.OptionCard.TYPE_LIST.length - 1)],
          window.data.getRandomInteger(1, 5),
          window.data.getRandomInteger(1, 10),
          window.data.OptionCard.CHECKIN_LIST[window.data.getRandomInteger(0, window.data.OptionCard.CHECKIN_LIST.length - 1)],
          window.data.OptionCard.CHECKOUT_LIST[window.data.getRandomInteger(0, window.data.OptionCard.CHECKOUT_LIST.length - 1)],
          getFeatures(window.data.OptionCard.FEATURES_LIST),
          window.data.OptionCard.DESCRIPTION_LIST,
          getPhotosArray()));
    }
    return offerOptionList;
  };

  var getLocationOptionList = function () {
    var locationOptionList = [];
    for (var i = 0; i < window.data.NUMBER_OF_NOTICES; i++) {
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
