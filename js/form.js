'use strict';

(function () {
  var minPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var form = document.querySelector('.ad-form');

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview');

  var photoListChooser = document.querySelector('.ad-form__input');
  var photoListPreview = document.querySelector('.ad-form__photo');
  var photoListContainer = document.querySelector('.ad-form__photo-container');

  function showPreviewPhotos(chooser, preview, container) {
    var files = chooser.files;
    for (var i = 0, f; i < files.length; i++) {
      f = files[i];
      if (f.type.match('image.*')) {
        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
          var img = document.createElement('img');
          img.style = 'height: 70px; border-radius: 5px; margin-right: 5px; margin-bottom: 5px;';
          img.src = e.target.result;
          if (container) {
            container.insertBefore(img, preview);
            preview.style = 'display: none;';
          } else {
            img.style = 'width: 70px; height: 70px; border-radius: 5px;';
            preview.appendChild(img);
          }
        });
        reader.readAsDataURL(f);
      }
    }
  }

  avatarChooser.addEventListener('change', function () {
    avatarPreview.innerHTML = '';
    avatarPreview.style = 'display: flex; justify-content: center; padding: 0; min-width: 70px;';
    showPreviewPhotos(avatarChooser, avatarPreview);
  });

  photoListChooser.addEventListener('change', function () {
    showPreviewPhotos(photoListChooser, photoListPreview, photoListContainer);
  });

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
    } else if (numberOfRoomField.value < numberOfGuestField.value && numberOfGuestField.value !== '100') {
      numberOfGuestField.setCustomValidity(texts[numberOfRoomField.value]);
    } else {
      numberOfGuestField.setCustomValidity('');
    }
  }

  var typeOfHousing = document.querySelector('#type');
  var price = document.querySelector('#price');

  function validateTypeAndPrice() {
    var texts = [
      'Минимальная цена для типа жилья "Бунгало" 0 рублей',
      'Минимальная цена для типа жилья "Квартира" 1000 рублей',
      'Минимальная цена для типа жилья "Дом" 5000 рублей',
      'Минимальная цена для типа жилья "Дворец" 10000 рублей'
    ];
    if (typeOfHousing.value === 'bungalo' && price.value < minPrice.BUNGALO) {
      price.setCustomValidity(texts[0]);
    } else if (typeOfHousing.value === 'flat' && price.value < minPrice.FLAT) {
      price.setCustomValidity(texts[1]);
    } else if (typeOfHousing.value === 'house' && price.value < minPrice.HOUSE) {
      price.setCustomValidity(texts[2]);
    } else if (typeOfHousing.value === 'palace' && price.value < minPrice.PALACE) {
      price.setCustomValidity(texts[3]);
    } else {
      price.setCustomValidity('');
    }
  }

  numberOfRoomField.addEventListener('change', function () {
    validateRoomAndGuest();
  });

  numberOfGuestField.addEventListener('change', function () {
    validateRoomAndGuest();
  });

  typeOfHousing.addEventListener('change', function () {
    validateTypeAndPrice();
    if (typeOfHousing.value === 'bungalo') {
      price.placeholder = minPrice.BUNGALO.toString();
    } else if (typeOfHousing.value === 'flat') {
      price.placeholder = minPrice.FLAT.toString();
    } else if (typeOfHousing.value === 'house') {
      price.placeholder = minPrice.HOUSE.toString();
    } else if (typeOfHousing.value === 'palace') {
      price.placeholder = minPrice.PALACE.toString();
    } else {
      price.setCustomValidity('');
    }
  });

  price.addEventListener('change', function () {
    validateTypeAndPrice();
  });

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var title = document.querySelector('#title');

  title.addEventListener('change', function () {
    if (title.value.length < title.getAttribute('minlength')) {
      title.setCustomValidity('Минимальное количество символов: ' + title.getAttribute('minlength'));
    } else {
      title.setCustomValidity('');
    }
  });

  function closeSuccess(element) {
    document.body.removeChild(element);
    window.map.reset();
  }

  function onSuccess() {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.body.appendChild(successElement);
    setTimeout(function () {
      closeSuccess(successElement);
    }, 3000);
  }

  var address = document.querySelector('#address');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    address.disabled = false;
    address.readOnly = true;
    window.backend.upload(new FormData(form), onSuccess, window.backend.onError);
  });

  var buttonFormReset = document.querySelector('.ad-form__reset');
  buttonFormReset.addEventListener('click', function (resetEvt) {
    resetEvt.preventDefault();
    window.map.reset();
  });

})();
