'use strict';

(function () {
  var MAX_DATA_RANDOM = 10;
  var ACTIVE_FILTER = 'img-filters__button--active';
  var fltersContainer = document.querySelector('.img-filters');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var previousFilter = filterDefault;
  var usersData = [];
  var usersDataCopy = [];

  var filtrateByComments = function () {
    if (!filterDiscussed.classList.contains(ACTIVE_FILTER)) {
      previousFilter.classList.remove(ACTIVE_FILTER);
      filterDiscussed.classList.add(ACTIVE_FILTER);
      usersData.sort(function (smaller, bigger) {
        return bigger.comments.length - smaller.comments.length;
      });
      window.main.showPictures(usersData);
      usersData = usersDataCopy.slice();
      previousFilter = filterDiscussed;
    }
  };

  var filtrateRandomly = function () {
    if (!filterRandom.classList.contains(ACTIVE_FILTER)) {
      previousFilter.classList.remove(ACTIVE_FILTER);
      filterRandom.classList.add(ACTIVE_FILTER);
      var randomData = [];
      for (var i = 0; i < MAX_DATA_RANDOM; i++) {
        var randomIndex = window.util.getRandomNumber(0, usersData.length - 1);
        var randomElement = usersData.splice(randomIndex, 1)[0];
        randomData.push(randomElement);
      }
      window.main.showPictures(randomData);
      usersData = usersDataCopy.slice();
      previousFilter = filterRandom;
    }
  };

  var filtrateDefault = function () {
    if (!filterDefault.classList.contains(ACTIVE_FILTER)) {
      previousFilter.classList.remove(ACTIVE_FILTER);
      filterDefault.classList.add(ACTIVE_FILTER);
      window.main.showPictures(usersData);
      previousFilter = filterDefault;
    }
  };

  var filterDefaultClickHandler = window.util.debounce(filtrateDefault);
  var filterRandomClickHandler = window.util.debounce(filtrateRandomly);
  var filterDiscussedClickHandler = window.util.debounce(filtrateByComments);

  var activate = function () {
    fltersContainer.classList.remove('img-filters--inactive');
    filterDiscussed.addEventListener('click', filterDiscussedClickHandler);
    filterRandom.addEventListener('click', filterRandomClickHandler);
    filterDefault.addEventListener('click', filterDefaultClickHandler);
  };

  var picturesDownloadSuccessHandler = function (data) {
    usersData = data;
    usersDataCopy = usersData.slice();
    window.main.showPictures(usersData);
    activate();
  };

  window.ajax.downloadData(picturesDownloadSuccessHandler);
})();
