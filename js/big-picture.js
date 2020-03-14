'use strict';

(function () {
  var bigPictureOverlay = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureOverlay.querySelector('.big-picture__cancel');

  var showBigPicture = function (userPicture, picturesData, renderedPictures) {
    var index = Array.from(renderedPictures).indexOf(userPicture);
    document.body.className = 'modal-open';
    bigPictureOverlay.classList.remove('hidden');
    var bigPictureImg = bigPictureOverlay.querySelector('.big-picture__img img');
    bigPictureImg.src = picturesData[index].url;
    bigPictureImg.alt = picturesData[index].description;
    window.social.render(picturesData[index]);
    bigPictureCancel.addEventListener('click', bigPictureCancelClickHandler);
    document.addEventListener('keydown', bigPictureCancelEscKeyHandler);
  };

  var removeBigPicture = function () {
    document.body.classList.remove('modal-open');
    bigPictureOverlay.classList.add('hidden');
    window.social.reset();
    bigPictureCancel.removeEventListener('click', bigPictureCancelClickHandler);
    document.removeEventListener('keydown', bigPictureCancelEscKeyHandler);
  };

  var bigPictureCancelEscKeyHandler = function (evt) {
    window.util.escEvent(evt, removeBigPicture);
  };

  var bigPictureCancelClickHandler = function (evt) {
    evt.preventDefault();
    removeBigPicture();
  };

  window.bigPicture = {
    show: showBigPicture
  };
})();
