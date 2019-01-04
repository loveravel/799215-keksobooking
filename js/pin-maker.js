'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function makePin(pin) {
    var offer = pin.offer ? pin.offer : false;
    var location = pin.location ? pin.location : false;

    if (offer) {
      var mapPinElement = mapPinTemplate.cloneNode(true);
      mapPinElement.style.left = location.x + 'px';
      mapPinElement.style.top = location.y + 'px';
      var avatar = pin.author ? pin.author.avatar : window.util.PATH_TO_DEFAULT_AVATAR;
      mapPinElement.querySelector('img').src = avatar;
      mapPinElement.querySelector('img').alt = offer.title;
      return mapPinElement;
    }
    return false;
  }

  window.pinMaker = function (data) {
    var pinList = [];
    for (var i = 0; i < data.length; i++) {
      pinList.push(makePin(data[i]));
    }
    return pinList;
  };
})();
