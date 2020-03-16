'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setUrl = function (input, img, callback) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();

      var readerLoadHandler = function () {
        img.src = reader.result;
        if (callback !== undefined) {
          callback();
        }
        reader.removeEventListener('load', readerLoadHandler);
      };

      reader.addEventListener('load', readerLoadHandler);
      reader.readAsDataURL(file);
    }
  };

  window.file = {
    setUrl: setUrl
  };
})();
