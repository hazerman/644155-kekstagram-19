'use strict';

(function () {
  var NEW_MESSAGE = 'Ошибка загрузки картинок с сервера';
  var NEW_BUTTON_TEXT = 'Понял вас';
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var typeToMessageMap = {
    'success': successMessage,
    'error': errorMessage
  };

  var showMessage = function (type, text, needChangeDefaultMessage) {
    var messageElement = typeToMessageMap[type].cloneNode(true);
    if (type === 'error') {
      var existingMessage = messageElement.querySelector('h2').innerText;
      var existingButtonText = messageElement.querySelector('button').innerText;
      messageElement.querySelector('h2').innerText = needChangeDefaultMessage ? NEW_MESSAGE + '. ' + text : existingMessage + '. ' + text;
      messageElement.querySelector('button').innerText = needChangeDefaultMessage ? NEW_BUTTON_TEXT : existingButtonText;
    }
    document.querySelector('main').append(messageElement);

    var removeMessage = function () {
      messageElement.remove();
    };

    var messageClickHandler = function (evt) {
      if (evt.target !== evt.target.closest('div') || evt.target === evt.target.closest('button')) {
        removeMessage();
        document.removeEventListener('click', messageClickHandler);
        document.removeEventListener('keydown', documentEscPressHandler);
      }
    };

    var documentEscPressHandler = function (evt) {
      window.util.escEvent(evt, removeMessage);
      document.removeEventListener('keydown', documentEscPressHandler);
      document.removeEventListener('click', messageClickHandler);
    };

    messageElement.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
  };

  window.message = {
    show: showMessage
  };
})();
