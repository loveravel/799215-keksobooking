'use strict';

(function () {
  var form = document.querySelector('.map__filter');
  var numberOfRoomField = document.querySelector('#room_number');
  var numberOfGuestField = document.querySelector('#capacity');

  function validateRoomAndGuest() {
    var texts = [
      'Такие хоромы не для гостей',
      'В одной комнате можно разместить только одного гостя',
      'В двух комнатах можно разместить одного или двух гостей',
      'В трех комнатах можно разместить одного, двух или трех гостей'
    ];
    if (numberOfRoomField.value === '100' && numberOfGuestField.value !== '0') {
      numberOfGuestField.setCustomValidity(texts[0]);
    } else if (numberOfRoomField.value < numberOfGuestField.value) {
      numberOfGuestField.setCustomValidity(texts[numberOfRoomField.value]);
    } else {
      numberOfGuestField.setCustomValidity('');
    }
  }

  numberOfRoomField.addEventListener('change', function () {
    validateRoomAndGuest();
  });

  numberOfGuestField.addEventListener('change', function () {
    validateRoomAndGuest();
  });

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (responce) {
      // Перевод формы в неактивное состояние (см. ТЗ)
    });
    evt.preventDefault();
  });
})();
