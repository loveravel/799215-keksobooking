'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  function insertCardList() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.constants.NUMBER_OF_NOTICES; i++) {
      fragment.appendChild(renderCard(
          window.data.authorOptionList[i],
          window.data.offerOptionList[i]));
    }
    window.constants.MAP.insertBefore(fragment, window.constants.FILTERS_CONTAINER);
  }
  window.card = insertCardList();
})();
