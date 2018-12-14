'use strict';

// Создает моковые данные

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

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

  var authorOptionList = getAuthorOptionList();
  var locationOptionList = getLocationOptionList();
  var offerOptionList = getOfferOptionList();

  window.optionsMaker = {
    authorOptionList: authorOptionList,
    locationOptionList: locationOptionList,
    offerOptionList: offerOptionList
  };
})();
