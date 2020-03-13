'use strict';

(function () {
  var picturesArea = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var usersData = [];
  var renderedPictures = [];

  var removeBigPicture = function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
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

  picturesArea.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.picture');
    if (target) {
      var index = Array.from(renderedPictures).indexOf(target);
      document.body.className = 'modal-open';
      bigPicture.classList.remove('hidden');
      var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
      bigPictureImg.src = usersData[index].url;
      bigPictureImg.alt = usersData[index].description;
      window.social.render(usersData[index]);
      bigPictureCancel.addEventListener('click', bigPictureCancelClickHandler);
      document.addEventListener('keydown', bigPictureCancelEscKeyHandler);
    }
  });

  var picturesDownloadSuccessHandler = function (data) {
    var fragmentForPictures = document.createDocumentFragment();
    usersData = data.slice();
    usersData.forEach(function (item) {
      var picture = window.picture.render(item);
      fragmentForPictures.append(picture);
    });
    renderedPictures = fragmentForPictures.querySelectorAll('.picture');
    picturesArea.append(fragmentForPictures);
  };

  window.ajax.downloadData(picturesDownloadSuccessHandler);
})();
