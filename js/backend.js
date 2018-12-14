'use strict';

(function () {
  var URL = 'https//js.dumb.academy/keksobooking';

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
    }
  };
})();

