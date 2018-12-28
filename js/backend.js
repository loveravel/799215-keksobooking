'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  var onXhrEvent = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
  };

  function onCloseError(button, error) {
    button.addEventListener('click', function () {
      document.body.removeChild(error);
      window.map.reset();
    });
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      onXhrEvent(xhr, onLoad, onError);

      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      onXhrEvent(xhr, onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },
    onError: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      errorElement.querySelector('.error__message').textContent = errorMessage;
      document.body.appendChild(errorElement);
      var closeButton = errorElement.querySelector('.error__button');
      onCloseError(closeButton, errorElement);
    }
  };
})();

