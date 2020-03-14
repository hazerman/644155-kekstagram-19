'use strict';

(function () {
  var MAX_DATA_RANDOM = 10;
  var ACTIVE_FILTER = 'img-filters__button--active';
  var fltersContainer = document.querySelector('.img-filters');
  var filtersForm = fltersContainer.querySelector('.img-filters__form');
  var previousFilter = filtersForm.querySelector('.img-filters__button');
  var usersData = [];
  var usersDataCopy = [];

  var getCommentFiltratedData = function () {
    usersData.sort(function (smaller, bigger) {
      return bigger.comments.length - smaller.comments.length;
    });
    var filteredArray = usersData.slice();
    usersData = usersDataCopy.slice();
    return filteredArray;
  };

  var getRandomFiltratedData = function () {
    var randomData = [];
    for (var i = 0; i < MAX_DATA_RANDOM; i++) {
      var randomIndex = window.util.getRandomNumber(0, usersData.length - 1);
      var randomElement = usersData.splice(randomIndex, 1)[0];
      randomData.push(randomElement);
    }
    usersData = usersDataCopy.slice();
    return randomData;
  };

  var getDefaultData = function () {
    return usersData;
  };

  var filtrate = function (button) {
    previousFilter.classList.remove(ACTIVE_FILTER);
    button.classList.add(ACTIVE_FILTER);
    filterChangeHandler(button);
    previousFilter = button;
  };

  var filterType = {
    'filter-default': getDefaultData,
    'filter-random': getRandomFiltratedData,
    'filter-discussed': getCommentFiltratedData
  };

  var filterChangeHandler = window.util.debounce(function (button) {
    window.picture.show(filterType[button.id]());
  });

  var filtersFormClickHandler = function (evt) {
    var target = evt.target.closest('.img-filters__button');
    if (target && !target.classList.contains(ACTIVE_FILTER)) {
      filtrate(target);
    }
  };

  var activateFilters = function () {
    fltersContainer.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', filtersFormClickHandler);
  };

  var picturesDownloadSuccessHandler = function (data) {
    usersData = data;
    usersDataCopy = usersData.slice();
    window.picture.show(usersData);
    activateFilters();
  };

  window.ajax.downloadData(picturesDownloadSuccessHandler);
})();
