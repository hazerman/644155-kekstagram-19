'use strict';

(function () {
  var editorContainer = document.querySelector('.img-upload');
  var editorOverlay = editorContainer.querySelector('.img-upload__overlay');
  var editorCancelButton = editorContainer.querySelector('.img-upload__cancel');
  var editorImgPreview = editorContainer.querySelector('.img-upload__preview img');
  var uploadedFile = document.querySelector('#upload-file');

  var deletePhotoStyle = function () {
    editorImgPreview.removeAttribute('style');
    editorImgPreview.removeAttribute('class');
  };

  var removeEditor = function () {
    document.body.classList.remove('modal-open');
    editorOverlay.classList.add('hidden');
    window.form.resetCustom();
    window.scale.setDefaultValue();
    window.effects.setDefault();
    deletePhotoStyle();
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

  var editorCancelClickHandler = function (evt) {
    evt.preventDefault();
    removeEditor();
  };

  var editorCancelEscKeyHandler = function (evt) {
    window.util.escEvent(evt, removeEditor);
  };

  uploadedFile.addEventListener('change', function () {
    showEditor();
  });

  window.editor = {
    changePhotoProperty: changePhotoProperty,
    setPhotoClass: setPhotoClass
  };
})();
