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

var getCardList = function () {
  var cardList = [];
  for (var i = 0; i < 8; i++) {
    cardList.push(/*new Author(getAvatarPath(i),*/
        new Offer(
            OptionsCard.TITLE_LIST[i],
            getAddress(),
            getRandom(1000, 1000000),
            OptionsCard.TYPE_LIST[getRandom(0, OptionsCard.TYPE_LIST.length - 1)],
            getRandom(1, 5),
            OptionsCard.CHECKIN_LIST[getRandom(0, OptionsCard.CHECKIN_LIST.length - 1)],
            OptionsCard.CHECKOUT_LIST[getRandom(0, OptionsCard.CHECKOUT_LIST.length - 1)],
            getFeatures(OptionsCard),
            OptionsCard.DESCRIPTION_LIST,
            getPhotosArray()));
        /*new Location(
            getLocation().x,
            getLocation().y)));*/
  }
  return cardList;
};

function getAvatarPath(index) {
  return 'img/avatars/user' + index + '.png';
}

function getLocation() {
  return {
    x: getRandom(0, 1200),
    y: getRandom(130, 630)
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
  var i = [];
  var photos = [];
  while (photos.length < 2) {
    var j = getRandom(1, 3);
    if (!checkForIdentical(i, j)) {
      photos += 'http://o0.github.io/assets/images/tokyo/hotel' + j + '.jpg';
      i += j;
    }
  }
  return photos;
}

document.querySelector('.map').classList.remove('map--faded');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapElement = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');

function renderCard(card) {
  var cardElement = cardTemplate.cloneNode(true);
  //cardElement.querySelector('.popup_avatar').src = card.avatar;
  cardElement.querySelector('.popup__title').textContent = card.title;
  cardElement.querySelector('.popup__text--address').textContent = card.address;
  cardElement.querySelector('.popup__text--price').textContent = card.price + '&#x20db;';
  cardElement.querySelector('.popup__type').textContent = card.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.rooms + ' комнат(ы) для '
    + card.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.checkin
    + ', выезд до' + card.checkout;
  cardElement.querySelector('.popup__features');
  cardElement.querySelector('.popup__description').textContent = card.description;
  //cardElement.querySelector('.popup__photos').src = card.photos[0];
  return cardElement;
}

var fragment = document.createDocumentFragment();
fragment.appendChild(renderCard(getCardList()[0]));
mapElement.appendChild(fragment);
