/* eslint-disable no-undef */
$(document).ready(function () {
  const $showNewTweetArrow = $('#arrowShow');
  const $scrollUpBtn = $('.btn-scrollUp');
  $showNewTweetArrow.on('click', showNewTweet);
  $scrollUpBtn.on('click', scrollUp);
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      console.log('sss');
      $scrollUpBtn.show();
      const $showNewTweetArrow = $('#arrowShow');
      $showNewTweetArrow.hide();
    } else {
      $showNewTweetArrow.show();
      $scrollUpBtn.hide();
    }
  });
});

const showNewTweet = function () {
  const $newTweetContainer = $('.new-tweet-container');
  if ($newTweetContainer.is(':hidden')) {
    $newTweetContainer.slideDown('slow');
    const $textArea = $('#tweet-text');
    $textArea.focus();
  } else {
    $newTweetContainer.slideUp('slow');
  }
};

const scrollUp = function (event) {
  event.preventDefault();
  const $textArea = $('#tweet-text');
  $('html, body').animate({ scrollTop: 0 }, '300');
  $textArea.focus();
};
