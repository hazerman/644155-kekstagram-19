'use strict';

(function () {
  var DEFAULT_EFFECT = 'effect-none';
  var effectsFieldset = document.querySelector('.effects');
  var effectIdToClassMap = {
    'effect-none': ['effects__preview--none'],
    'effect-chrome': ['effects__preview--chrome', 'grayscale', 0, 1, ''],
    'effect-sepia': ['effects__preview--sepia', 'sepia', 0, 1, ''],
    'effect-marvin': ['effects__preview--marvin', 'invert', 0, 100, '%'],
    'effect-phobos': ['effects__preview--phobos', 'blur', 0, 3, 'px'],
    'effect-heat': ['effects__preview--heat', 'brightness', 1, 3, '']
  };
  var currentEffectId = DEFAULT_EFFECT;
  var previousEffectId = DEFAULT_EFFECT;

  var getFilterEffect = function (levelValue) {
    var filterEffect = '';
    if (currentEffectId === DEFAULT_EFFECT) {
      return filterEffect;
    }
    var effectName = effectIdToClassMap[currentEffectId][1];
    var effectValue;
    if (levelValue === undefined) {
      effectValue = effectIdToClassMap[currentEffectId][3];
    } else {
      var range = effectIdToClassMap[currentEffectId][3] - effectIdToClassMap[currentEffectId][2];
      var valueInRange = range * (levelValue / 100);
      effectValue = valueInRange + effectIdToClassMap[currentEffectId][2];
    }
    var effectUnit = effectIdToClassMap[currentEffectId][4];
    filterEffect = effectName + '(' + effectValue.toFixed(3) + effectUnit + ')';
    return filterEffect;
  };

  var changeDepth = function (levelValue) {
    var effect = getFilterEffect(levelValue);
    window.editor.changePhotoProperty('filter', effect);
  };

  var changeEffect = function (id) {
    currentEffectId = id;
    var effect = getFilterEffect();
    window.level.setDefault();
    if (currentEffectId === DEFAULT_EFFECT) {
      window.level.hide();
    }
    if (previousEffectId === DEFAULT_EFFECT) {
      window.level.show();
    }
    window.editor.setPhotoClass(effectIdToClassMap[currentEffectId][0]);
    window.editor.changePhotoProperty('filter', effect);
    previousEffectId = id;
  };

  effectsFieldset.addEventListener('change', function (evt) {
    var target = evt.target;
    changeEffect(target.id);
  });

  window.effects = {
    changeDepth: changeDepth
  }
})();
