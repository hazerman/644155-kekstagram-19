'use strict';

(function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;
  var DEBOUNCE_INTERVAL = 500;

  var elementEnterPressHadler = function (evt, callback) {
    if (evt.keyCode === KEY_ENTER) {
      callback();
    }
  };

  var elementEscPressHadler = function (evt, callback) {
    if (evt.keyCode === KEY_ESC) {
      callback();
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    enterEvent: elementEnterPressHadler,
    escEvent: elementEscPressHadler,
    debounce: debounce,
    getRandomNumber: getRandomNumber
  };
})();
