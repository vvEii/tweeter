/* eslint-disable no-undef */
$(document).ready(function () {
  const $showNewTweet = $('.dropdown');
  $showNewTweet.on('click', showNewTweet);
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
