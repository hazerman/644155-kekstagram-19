'use strict';

(function () {
  var Value = {
    DEFAULT: 100,
    STEP: 25,
    MAX: 100,
    MIN: 25
  };
  var scaleFieldset = document.querySelector('.scale');
  var scaleVisibility = scaleFieldset.querySelector('.scale__control--value');
  var scaleReduceButton = scaleFieldset.querySelector('.scale__control--smaller');
  var scaleIncreaseButton = scaleFieldset.querySelector('.scale__control--bigger');

  var setDefaultValue = function () {
    scaleVisibility.value = Value.DEFAULT + '%';
    if (Value.DEFAULT === Value.MAX) {
      scaleIncreaseButton.disabled = true;
    }
    if (Value.DEFAULT === Value.MIN) {
      scaleReduceButton.disabled = true;
    }
  };

  var changeScale = function (needIncreaseScale) {
    var oldValue = parseInt(scaleVisibility.value, 10);
    var newValue;
    newValue = needIncreaseScale ? oldValue + Value.STEP : oldValue - Value.STEP;
    if (newValue === Value.MAX) {
      scaleIncreaseButton.disabled = true;
    } else if (newValue !== Value.MAX && scaleIncreaseButton.disabled) {
      scaleIncreaseButton.disabled = false;
    }
    if (newValue === Value.MIN) {
      scaleReduceButton.disabled = true;
    } else if (newValue !== Value.MIN && scaleReduceButton.disabled) {
      scaleReduceButton.disabled = false;
    }
    scaleVisibility.value = newValue + '%';
    var newValueTranslated = newValue / 100;
    var propertyValue = 'scale(' + newValueTranslated + ')';
    window.editor.changePhotoProperty('transform', propertyValue);
  };

  scaleIncreaseButton.addEventListener('click', function () {
    changeScale(true);
  });

  scaleReduceButton.addEventListener('click', function () {
    changeScale(false);
  });

  setDefaultValue();
})();
