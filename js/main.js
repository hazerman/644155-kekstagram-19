'use strict';

(function () {
  var picturesArea = document.querySelector('.pictures');
  var usersData = [];

  var picturesDownloadSuccessHandler = function (data) {
    var fragmentForPictures = document.createDocumentFragment();
    usersData = data.slice();
    usersData.forEach(function (item) {
      var picture = window.picture.render(item);
      fragmentForPictures.append(picture);
    });
    picturesArea.append(fragmentForPictures);
  };

  window.ajax.downloadData(picturesDownloadSuccessHandler)
})();
