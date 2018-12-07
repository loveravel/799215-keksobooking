'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderMapPin(author, offer, location) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = location.x + 'px';
    mapPinElement.style.top = location.y + 'px';
    mapPinElement.querySelector('img').src = author.avatar;
    mapPinElement.querySelector('img').alt = offer.title;
    return mapPinElement;
  }

  function insertMapPinList() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.constants.NUMBER_OF_NOTICES; i++) {
      fragment.appendChild(
          renderMapPin(
              window.data.authorOptionList[i],
              window.data.offerOptionList[i],
              window.data.locationOptionList[i]));
    }
    window.constants.MAP.insertBefore(fragment, window.constants.FILTERS_CONTAINER);
  }

  window.pin = insertMapPinList();
})();
