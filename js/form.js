'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var form = document.querySelector('.ad-form');

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview');

  var photoListChooser = document.querySelector('.ad-form__input');
  var photoListPreview = document.querySelector('.ad-form__photo');

  function showPreviewPhotos(chooser, preview) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < chooser.files.length; i++) {
      var file = chooser.files[i];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var img = document.createElement('img');
        img.file = file;
        img.style = 'width: 60px; height: 60px; border-radius: 5px; margin: 5px;';
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          img.src = reader.result;
        });
        reader.readAsDataURL(file);
        fragment.appendChild(img);
      }
    }

    preview.appendChild(fragment);
  }

  avatarChooser.addEventListener('change', function () {
    avatarPreview.innerHTML = '';
    avatarPreview.style = 'display: flex; justify-content: center; padding: 0; min-width: 70px;';
    showPreviewPhotos(avatarChooser, avatarPreview);
  });

  photoListChooser.addEventListener('change', function () {
    showPreviewPhotos(photoListChooser, photoListPreview);
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
    if (typeOfHousing.value === 'bungalo' && price.value < 0) {
      price.setCustomValidity(texts[0]);
    } else if (typeOfHousing.value === 'flat' && price.value < 1000) {
      price.setCustomValidity(texts[1]);
    } else if (typeOfHousing.value === 'house' && price.value < 5000) {
      price.setCustomValidity(texts[2]);
    } else if (typeOfHousing.value === 'palace' && price.value < 10000) {
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
      price.placeholder = '0';
    } else if (typeOfHousing.value === 'flat') {
      price.placeholder = '1000';
    } else if (typeOfHousing.value === 'house') {
      price.placeholder = '5000';
    } else if (typeOfHousing.value === 'palace') {
      price.placeholder = '10000';
    } else {
      price.setCustomValidity('');
    }
  });

  price.addEventListener('change', function () {
    validateTypeAndPrice();
  });

  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), onSuccess, window.backend.onError);
  });

  var buttonFormReset = document.querySelector('.ad-form__reset');
  buttonFormReset.addEventListener('click', function (resetEvt) {
    resetEvt.preventDefault();
    window.map.reset();
  });
})();
