'use strict';

(function () {
  var MAX_COMMENTS = 5;
  var socialArea = document.querySelector('.social');
  var socialCaption = socialArea.querySelector('.social__caption');
  var socialCommentsWrapper = socialArea.querySelector('.social__comments');
  var socialCommentTemplate = socialCommentsWrapper.firstElementChild.cloneNode(true);
  var moreCommentsButton = socialArea.querySelector('.social__comments-loader');
  var comments = [];
  var startComment = 0;
  var endComment = 0;

  var getSlicedCommentArray = function () {
    endComment += MAX_COMMENTS;
    endComment = endComment >= comments.length ? comments.length : endComment;
    var slicedComments = comments.slice(startComment, endComment);
    startComment += MAX_COMMENTS;
    if (endComment >= comments.length) {
      moreCommentsButton.classList.add('hidden');
      moreCommentsButton.removeEventListener('click', moreCommentsButtonClickHandler);
    }
    return slicedComments;
  };

  var getRenderedComment = function (commentData) {
    var renderedComment = socialCommentTemplate.cloneNode(true);
    var renderedCommentImg = renderedComment.querySelector('img');
    var renderedCommentText = renderedComment.querySelector('p');
    renderedCommentImg.src = commentData.avatar;
    renderedCommentImg.alt = commentData.name;
    renderedCommentText.textContent = commentData.message;
    return renderedComment;
  };

  var renderComments = function (commentsData) {
    var fragmentForComments = document.createDocumentFragment();
    commentsData.forEach(function (item) {
      fragmentForComments.append(getRenderedComment(item));
    });
    socialCommentsWrapper.append(fragmentForComments);
    var socialCommentCount = socialArea.querySelector('.social__comment-count');
    var splittedSocialCommentCount = socialCommentCount.innerHTML.split(' ');
    splittedSocialCommentCount.splice(0, 1, endComment);
    socialCommentCount.innerHTML = splittedSocialCommentCount.join(' ');
  };

  var moreCommentsButtonClickHandler = function () {
    renderComments(getSlicedCommentArray());
  };

  var likesCount = document.querySelector('.likes-count');

  var renderSocial = function (data) {
    var commentsCount = document.querySelector('.comments-count');
    comments = data.comments.slice();
    socialCaption.textContent = data.description;
    likesCount.textContent = data.likes;
    commentsCount.textContent = comments.length;
    socialCommentsWrapper.innerHTML = '';
    renderComments(getSlicedCommentArray());
    moreCommentsButton.addEventListener('click', moreCommentsButtonClickHandler);
  };

  var resetSocial = function () {
    if (endComment >= comments.length) {
      moreCommentsButton.classList.remove('hidden');
      moreCommentsButton.removeEventListener('click', moreCommentsButtonClickHandler);
    }
    startComment = 0;
    endComment = 0;
  };

  window.social = {
    render: renderSocial,
    reset: resetSocial
  };
})();
