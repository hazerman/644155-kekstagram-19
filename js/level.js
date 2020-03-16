'use strict';

(function () {
  var DEFAULT_POSITION = 100;
  var DRAG_AREA_WIDTH = 453;
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelInput = effectLevel.querySelector('.effect-level__value');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var dragLimit = {
    max: 100,
    min: 0
  };

  var changeDependentValues = function () {
    var currentLevelPosition = parseFloat(effectLevelPin.style.left);
    effectLevelDepth.style.width = currentLevelPosition + '%';
    effectLevelInput.setAttribute('value', currentLevelPosition.toFixed());
    window.effects.changeDepth(currentLevelPosition);
  };

  var setLevelDefault = function () {
    effectLevelPin.style.left = DEFAULT_POSITION + '%';
    effectLevelDepth.style.width = DEFAULT_POSITION + '%';
    effectLevelInput.setAttribute('value', DEFAULT_POSITION);
  };

  var hideLevel = function () {
    effectLevel.classList.add('hidden');
  };

  var showLevel = function () {
    effectLevel.classList.remove('hidden');
  };

  setLevelDefault();
  hideLevel();

  window.dragNDrop.activate(dragLimit, DRAG_AREA_WIDTH, effectLevelPin, changeDependentValues);

  window.level = {
    setDefault: setLevelDefault,
    hide: hideLevel,
    show: showLevel
  };
})();
