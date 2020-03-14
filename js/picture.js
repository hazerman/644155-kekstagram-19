'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesArea = document.querySelector('.pictures');
  var usersData = [];
  var renderedPictures = [];

  var renderPicture = function (data) {
    var newPicture = pictureTemplate.cloneNode(true);
    var newPictureImg = newPicture.querySelector('.picture__img');
    var newPictureComment = newPicture.querySelector('.picture__comments');
    var newPictureLike = newPicture.querySelector('.picture__likes');
    newPictureImg.src = data.url;
    newPictureComment.textContent = data.comments.length;
    newPictureLike.textContent = data.likes;
    return newPicture;
  };

  picturesArea.addEventListener('click', function (evt) {
    var target = evt.target.closest('.picture');
    if (target) {
      evt.preventDefault();
      window.bigPicture.show(target, usersData, renderedPictures);
    }
  });

  var removePictures = function () {
    renderedPictures.forEach(function (item) {
      item.remove();
    });
  };

  var showPictures = function (data) {
    usersData = data.slice();
    if (renderedPictures.length) {
      removePictures();
    }
    var fragmentForPictures = document.createDocumentFragment();
    data.forEach(function (item) {
      var picture = renderPicture(item);
      fragmentForPictures.append(picture);
    });
    renderedPictures = fragmentForPictures.querySelectorAll('.picture');
    picturesArea.append(fragmentForPictures);
  };

  window.picture = {
    show: showPictures
  };
})();
