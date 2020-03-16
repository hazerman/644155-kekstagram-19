'use strict';

(function () {
  var editorContainer = document.querySelector('.img-upload');
  var editorOverlay = editorContainer.querySelector('.img-upload__overlay');
  var editorCancelButton = editorContainer.querySelector('.img-upload__cancel');
  var editorImgWrapper = editorContainer.querySelector('.img-upload__preview');
  var editorImgPreview = editorImgWrapper.querySelector('img');
  var uploadedFile = document.querySelector('#upload-file');

  var removeEditor = function () {
    document.body.classList.remove('modal-open');
    editorOverlay.classList.add('hidden');
    window.form.resetCustom();
    window.scale.setDefaultValue();
    window.effects.setDefault();
    window.util.removeAttributeIfExists(editorImgPreview, 'style');
    window.util.removeAttributeIfExists(editorImgPreview, 'class');
    editorCancelButton.removeEventListener('click', editorCancelClickHandler);
    document.removeEventListener('keydown', editorCancelEscKeyHandler);
  };

  var showEditor = function () {
    document.body.className = 'modal-open';
    editorOverlay.classList.remove('hidden');
    editorCancelButton.addEventListener('click', editorCancelClickHandler);
    document.addEventListener('keydown', editorCancelEscKeyHandler);
  };

  var changePhotoProperty = function (property, value) {
    editorImgPreview.style[property] = value;
  };

  var setPhotoClass = function (classValue) {
    editorImgPreview.className = classValue;
  };

  var stubMessageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  var stubMessage;

  var setImageStub = function () {
    stubMessage = stubMessageTemplate.cloneNode(true);
    editorImgWrapper.append(stubMessage);
  };

  var deleteImageStub = function () {
    stubMessage.remove();
    stubMessage = null;
  };

  var editorCancelClickHandler = function (evt) {
    evt.preventDefault();
    removeEditor();
  };

  var editorCancelEscKeyHandler = function (evt) {
    if (document.activeElement !== window.form.hashtagsField && document.activeElement !== window.form.commentField) {
      window.util.escEvent(evt, removeEditor);
    }
  };

  uploadedFile.addEventListener('change', function () {
    setImageStub();
    editorImgPreview.src = '';
    showEditor();
    window.file.setUrl(uploadedFile, editorImgPreview, deleteImageStub);
  });

  window.editor = {
    changePhotoProperty: changePhotoProperty,
    setPhotoClass: setPhotoClass,
    remove: removeEditor
  };
})();
