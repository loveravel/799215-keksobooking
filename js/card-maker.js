'use strict';

// Отвечает за создание карт объявлений для карты

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  function makeCard(card) {
    var author = card.author ? card.author : false;
    var offer = card.offer ? card.offer : false;

    if (offer) {
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
      if (offer.features.length !== 0) {
        cardElement.querySelector('.popup__features').innerHTML = '';
        for (var featureIndex = 0; featureIndex < offer.features.length; featureIndex++) {
          var featureElement = document.createElement('li');
          featureElement.className = 'popup__feature popup__feature--' + offer.features[featureIndex];
          cardElement.querySelector('.popup__features').appendChild(featureElement);
        }
      } else {
        cardElement.querySelector('.popup__features').classList.add('hidden');
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
  }

  window.cardMaker = function (data) {
    var cardList = [];
    for (var i = 0; i < data.length; i++) {
      cardList.push(makeCard(data[i]));
    }
    return cardList;
  };
})();
