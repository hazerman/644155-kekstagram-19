'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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

  window.picture = {
    render: renderPicture
  }
})();
