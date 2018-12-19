'use strict';

// Отвечает за создание меток для карты

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pinMaker = function (pin) {
    var author = pin.author ? pin.author : false;
    var offer = pin.offer ? pin.offer : false;
    var location = pin.location ? pin.location : false;
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = location.x + 'px';
    mapPinElement.style.top = location.y + 'px';
    mapPinElement.querySelector('img').src = author.avatar;
    mapPinElement.querySelector('img').alt = offer.title;
    return mapPinElement;
  };
})();
