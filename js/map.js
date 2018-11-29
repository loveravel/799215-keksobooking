'use strict';

var PIN_SIZE_X = 50;
var PIN_SIZE_Y = 70;

var OptionsCard = {
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
};

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

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function getRandomArray(arr, n) {
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
    x: getRandomInteger(PIN_SIZE_X / 2, 1200 - PIN_SIZE_X / 2) - PIN_SIZE_X / 2,
    y: getRandomInteger(130, 630) - PIN_SIZE_Y
  };
}

function getAddress(location) {
  return location.x + ', ' + location.y;
}

function getFeatures(arr) {
  return getRandomArray(arr, getRandomInteger(1, 5));
}

function getPhotosArray() {
  var photos = [];
  for (var i = 0; i < 3; i++) {
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
  }
  photos = getRandomArray(photos, getRandomInteger(1, 3));
  return photos;
}

var getAuthorOptionList = function () {
  var authorOptionList = [];
  var arr = getRandomArray(getArrayWithNumbers(1, 8), 8);
  for (var i = 0; i < arr.length; i++) {
    authorOptionList.push(new Author(getPathToAvatar(arr[i])));
  }
  return authorOptionList;
};

var getOfferOptionList = function () {
  var offerOptionList = [];
  for (var i = 0; i < 8; i++) {
    offerOptionList.push(new Offer(
        OptionsCard.TITLE_LIST[getRandomInteger(0, 7)],
        getAddress(locationOptionList[i]),
        getRandomInteger(1000, 1000000),
        OptionsCard.TYPE_LIST[getRandomInteger(0, OptionsCard.TYPE_LIST.length - 1)],
        getRandomInteger(1, 5),
        getRandomInteger(1, 10),
        OptionsCard.CHECKIN_LIST[getRandomInteger(0, OptionsCard.CHECKIN_LIST.length - 1)],
        OptionsCard.CHECKOUT_LIST[getRandomInteger(0, OptionsCard.CHECKOUT_LIST.length - 1)],
        getFeatures(OptionsCard.FEATURES_LIST),
        OptionsCard.DESCRIPTION_LIST,
        getPhotosArray()));
  }
  return offerOptionList;
};

var getLocationOptionList = function () {
  var locationOptionList = [];
  for (var i = 0; i < 8; i++) {
    locationOptionList.push(new Location(
        getLocation().x,
        getLocation().y));
  }
  return locationOptionList;
};

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');

function renderCard(author, offer) {
  var cardElement = cardTemplate.cloneNode(true);
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

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

function insertMapPinList() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(
        renderMapPin(
            authorOptionList[i],
            offerOptionList[i],
            locationOptionList[i]));
  }
  map.insertBefore(fragment, filtersContainer);
}

function insertCard() {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(
      authorOptionList[0],
      offerOptionList[0]));
  map.insertBefore(fragment, filtersContainer);
}

var mainPin = document.querySelector('.map__pin--main');

var onMainPinClick = function () {
  document.querySelector('.map').classList.remove('map--faded');
  if (document.querySelectorAll('.map__pin').length === 1) {
    insertMapPinList();
    insertCard();
  }
};

mainPin.addEventListener('click', function () {
  onMainPinClick();
});

/* var pinList = document.querySelectorAll('.map__pin');
var cardList = document.querySelectorAll('.map__card');

var onPinClick = function () {

};

pinList.addEventListener('click', function () {
  onPinClick();
});*/
