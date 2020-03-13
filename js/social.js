'use strict';

(function () {
  var MAX_COMMENTS = 5;
  var socialArea = document.querySelector('.social');
  var socialCaption = socialArea.querySelector('.social__caption');
  var socialCommentsWrapper = socialArea.querySelector('.social__comments');
  var socialCommentTemplate = socialCommentsWrapper.firstElementChild.cloneNode(true);
  var moreCommentsButton = socialArea.querySelector('.social__comments-loader');
  var comment = {
    messages: [],
    start: 0,
    end: 0,
    getSlicedMessages: function () {
      this.end += MAX_COMMENTS;
      this.end = this.end >= this.messages.length ? this.messages.length : this.end;
      var slicedMessages = this.messages.slice(this.start, this.end);
      this.start += MAX_COMMENTS;
      if (this.end >= this.messages.length) {
        moreCommentsButton.classList.add('hidden');
        moreCommentsButton.removeEventListener('click', moreCommentsButtonClickHandler);
      }
      return slicedMessages;
    },
    getRenderedSingle: function (commentData) {
      var renderedComment = socialCommentTemplate.cloneNode(true);
      var renderedCommentImg = renderedComment.querySelector('img');
      var renderedCommentText = renderedComment.querySelector('p');
      renderedCommentImg.src = commentData.avatar;
      renderedCommentImg.alt = commentData.name;
      renderedCommentText.textContent = commentData.message;
      return renderedComment;
    },
    render: function () {
      var commentsData = this.getSlicedMessages();
      var fragmentForComments = document.createDocumentFragment();
      commentsData.forEach(function (item) {
        fragmentForComments.append(comment.getRenderedSingle(item));
      });
      socialCommentsWrapper.append(fragmentForComments);
      var socialCommentCount = socialArea.querySelector('.social__comment-count');
      var splittedSocialCommentCount = socialCommentCount.innerHTML.split(' ');
      splittedSocialCommentCount.splice(0, 1, this.end);
      socialCommentCount.innerHTML = splittedSocialCommentCount.join(' ');
    }
  };

  var moreCommentsButtonClickHandler = function () {
    comment.render();
  };

  var likesCount = document.querySelector('.likes-count');

  var renderSocial = function (data) {
    var commentsCount = document.querySelector('.comments-count');
    comment.messages = data.comments.slice();
    socialCaption.textContent = data.description;
    likesCount.textContent = data.likes;
    commentsCount.textContent = comment.messages.length;
    socialCommentsWrapper.innerHTML = '';
    comment.render();
    moreCommentsButton.addEventListener('click', moreCommentsButtonClickHandler);
  };

  var resetSocial = function () {
    if (comment.end >= comment.messages.length) {
      moreCommentsButton.classList.remove('hidden');
      moreCommentsButton.removeEventListener('click', moreCommentsButtonClickHandler);
    }
    comment.start = 0;
    comment.end = 0;
  };

  window.social = {
    render: renderSocial,
    reset: resetSocial
  };
})();
