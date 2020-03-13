'use strict';

(function () {
  var picturesArea = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var usersData = [];
  var renderedPictures = [];

  picturesArea.addEventListener('click', function (evt) {
    var target = evt.target.closest('.picture');
    if (target) {
      var index = Array.from(renderedPictures).indexOf(target);
      document.body.className = 'modal-open';
      bigPicture.classList.remove('hidden');
      var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
      bigPictureImg.src = usersData[index].url;
      bigPictureImg.alt = usersData[index].description;
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
