'use strict';

(function () {
  var activate = function (areaLimit, dragAreaWidth, element, callback) {
    var percentsInPixel = 100 / dragAreaWidth;
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      var startCoordinateX = evt.clientX;
      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        var shiftX = startCoordinateX - moveEvt.clientX;
        var newStyleLeft = parseFloat(target.style.left) - (shiftX * percentsInPixel);
        startCoordinateX = moveEvt.clientX;

        var getPositionStyle = function (newStylePosition) {
          var position;
          if (newStylePosition < areaLimit.min) {
            position = areaLimit.min + '%';
            document.removeEventListener('mousemove', mouseMoveHandler);
          } else if (newStylePosition > areaLimit.max) {
            position = areaLimit.max + '%';
            document.removeEventListener('mousemove', mouseMoveHandler);
          } else {
            position = newStylePosition + '%';
          }
          return position;
        };

        target.style.left = getPositionStyle(newStyleLeft);
        callback();
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  };

  window.dragNDrop = {
    activate: activate,
  };
})();
