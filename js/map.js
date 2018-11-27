'use strict';

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

function getRandom(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function checkForIdentical(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return true;
    }
  }
  return false;
}

function getAvatarPath(index) {
  return 'img/avatars/user0' + index + '.png';
}

function getLocation() {
  return {
    x: getRandom(0, 1200) - 25,
    y: getRandom(130, 630) - 70
  };
}

function getAddress() {
  return getLocation().x + ', ' + getLocation().y;
}

function getFeatures(optionsFeaturesList) {
  var featuresList = [];
  for (var i = 0; i < optionsFeaturesList.length; i++) {
    var featureIndex = getRandom(0, optionsFeaturesList.length);
    if (!checkForIdentical(featuresList, optionsFeaturesList[featureIndex])) {
      featuresList += optionsFeaturesList[featureIndex];
    }
  }
  return featuresList;
}

function getPhotosArray() {
  var photos = [];
  for (var i = 0; i < 3; i++) {
    var j = getRandom(1, 3);
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + j + '.jpg');
  }
  return photos;
}

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

var getAuthorOptionList = function () {
  var authorOptionList = [];
  for (var i = 0; i < 8; i++) {
    authorOptionList.push(new Author(getAvatarPath(getRandom(1, 8))));
  }
  return authorOptionList;
};

var getOfferOptionList = function () {
  var offerOptionList = [];
  for (var i = 0; i < 8; i++) {
    offerOptionList.push(new Offer(
        OptionsCard.TITLE_LIST[getRandom(0, 7)],
        getAddress(),
        getRandom(1000, 1000000),
        OptionsCard.TYPE_LIST[getRandom(0, OptionsCard.TYPE_LIST.length - 1)],
        getRandom(1, 5),
        getRandom(1, 10),
        OptionsCard.CHECKIN_LIST[getRandom(0, OptionsCard.CHECKIN_LIST.length - 1)],
        OptionsCard.CHECKOUT_LIST[getRandom(0, OptionsCard.CHECKOUT_LIST.length - 1)],
        getFeatures(OptionsCard),
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

document.querySelector('.map').classList.remove('map--faded');

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
  cardElement.querySelector('.popup__features');
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photos').src = offer.photos[0];
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

var fragment = document.createDocumentFragment();
fragment.appendChild(
    renderCard(getAuthorOptionList()[0],
        getOfferOptionList()[0]));
for (var i = 0; i < 8; i++) {
  fragment.appendChild(
      renderMapPin(
          getAuthorOptionList()[i],
          getOfferOptionList()[i],
          getLocationOptionList()[i]));
}
map.insertBefore(fragment, filtersContainer);
