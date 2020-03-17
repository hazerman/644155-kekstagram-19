'use strict';

(function () {
  var HASHTAG_START = '#';
  var HASHTAG_MAX_LENGTH = 20;
  var REGEXP = /#[\w\dА-я]+$/;
  var MAX_HASHTAGS_COUNT = 5;
  var INVALID_STYLE = '0 0 0 5px red';
  var uploadForm = document.querySelector('.img-upload__form');
  var formHashtags = uploadForm.querySelector('.text__hashtags');
  var formComment = uploadForm.querySelector('.text__description');

  var resetCustom = function () {
    uploadForm.reset();
    window.util.removeAttributeIfExists(formHashtags, 'style');
    formHashtags.setCustomValidity('');
  };

  var getValidityMessage = function () {
    var validityMessage = '';
    var messages = [];
    var inputText = formHashtags.value;
    if (inputText === '') {
      return validityMessage;
    }
    var unmodifiedHashtags = inputText.trim().split(' ');
    var hashtags = unmodifiedHashtags.map(function (hashtag) {
      return hashtag.toLowerCase();
    });
    if (hashtags.length > MAX_HASHTAGS_COUNT) {
      messages.push('Не пиши больше ' + MAX_HASHTAGS_COUNT + ' хэштегов');
    }
    var startHasChecked = false;
    var matchHasChecked = false;
    var minLengthHasChecked = false;
    var maxLengthHasChecked = false;
    var duplicatesHasChecked = false;
    hashtags.forEach(function (hashtag) {
      if (!startHasChecked && !hashtag.startsWith(HASHTAG_START)) {
        messages.push('Хэштег должен начинаться с решётки');
        startHasChecked = true;
      }
      if (!matchHasChecked && !hashtag.match(REGEXP)) {
        messages.push('Хэштег может содержать только одну решетку, цифры, буквы, подчеркивание');
        matchHasChecked = true;
      }
      if (!minLengthHasChecked && hashtag.length === 1 && hashtag.startsWith(HASHTAG_START)) {
        messages.push('Хэштег не может содержать только решётку');
        minLengthHasChecked = true;
      }
      if (!maxLengthHasChecked && hashtag.length >= HASHTAG_MAX_LENGTH && hashtag.startsWith(HASHTAG_START)) {
        messages.push('Хэштег может содержать максимум ' + HASHTAG_MAX_LENGTH + ' символов');
        maxLengthHasChecked = true;
      }
      if (!duplicatesHasChecked && window.util.hasArrayDuplicatedItems(hashtag, hashtags)) {
        messages.push('Нельзя повторять хэштеги, а также #ХэшТег и #хэштег считаются одним и тем же тегом');
        duplicatesHasChecked = true;
      }
    });
    validityMessage = messages.join('. \n');
    return validityMessage;
  };

  var formSendSuccessHandler = function () {
    window.editor.remove();
    window.message.show('success');
  };

  var formSendErrorHandler = function (message) {
    window.editor.remove();
    window.message.show('error', message, false);
  };

  formHashtags.addEventListener('input', function () {
    formHashtags.setCustomValidity(getValidityMessage());
    if (formHashtags.validity.valid && formHashtags.hasAttribute('style')) {
      formHashtags.removeAttribute('style');
    } else if (!formHashtags.validity.valid) {
      formHashtags.style.boxShadow = INVALID_STYLE;
    }
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.ajax.sendData(new FormData(uploadForm), formSendSuccessHandler, formSendErrorHandler);
  });

  window.form = {
    resetCustom: resetCustom,
    hashtagsField: formHashtags,
    commentField: formComment
  };
})();
