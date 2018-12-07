'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
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
      x: window.functions.getRandomInteger(PIN_WIDTH / 2, 1200 - PIN_WIDTH / 2),
      y: window.functions.getRandomInteger(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
    };
  }

  function getAddress(location) {
    return (location.x + PIN_WIDTH / 2) + ', ' + (location.y + PIN_HEIGHT);
  }

  function getFeatures(arr) {
    return getRandomArray(arr, window.functions.getRandomInteger(1, 5));
  }

  function getPhotosArray() {
    var photos = [];
    for (var i = 0; i < 3; i++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
    }
    photos = getRandomArray(photos, window.functions.getRandomInteger(1, 3));
    return photos;
  }

  var getAuthorOptionList = function () {
    var authorOptionList = [];
    var arr = getRandomArray(getArrayWithNumbers(1, window.constants.NUMBER_OF_NOTICES), window.constants.NUMBER_OF_NOTICES);
    for (var i = 0; i < arr.length; i++) {
      authorOptionList.push(new Author(getPathToAvatar(arr[i])));
    }
    return authorOptionList;
  };

  var getOfferOptionList = function () {
    var offerOptionList = [];
    for (var i = 0; i < window.constants.NUMBER_OF_NOTICES; i++) {
      offerOptionList.push(new Offer(
          OptionsCard.TITLE_LIST[window.functions.getRandomInteger(0, 7)],
          getAddress(locationOptionList[i]),
          window.functions.getRandomInteger(1000, 1000000),
          OptionsCard.TYPE_LIST[window.functions.getRandomInteger(0, OptionsCard.TYPE_LIST.length - 1)],
          window.functions.getRandomInteger(1, 5),
          window.functions.getRandomInteger(1, 10),
          OptionsCard.CHECKIN_LIST[window.functions.getRandomInteger(0, OptionsCard.CHECKIN_LIST.length - 1)],
          OptionsCard.CHECKOUT_LIST[window.functions.getRandomInteger(0, OptionsCard.CHECKOUT_LIST.length - 1)],
          getFeatures(OptionsCard.FEATURES_LIST),
          OptionsCard.DESCRIPTION_LIST,
          getPhotosArray()));
    }
    return offerOptionList;
  };

  var getLocationOptionList = function () {
    var locationOptionList = [];
    for (var i = 0; i < window.constants.NUMBER_OF_NOTICES; i++) {
      locationOptionList.push(new Location(
          getLocation().x,
          getLocation().y));
    }
    return locationOptionList;
  };

  var authorOptionList = getAuthorOptionList();
  var locationOptionList = getLocationOptionList();
  var offerOptionList = getOfferOptionList();
  window.data = {
    authorOptionList: authorOptionList,
    locationOptionList: locationOptionList,
    offerOptionList: offerOptionList
  };
})();
