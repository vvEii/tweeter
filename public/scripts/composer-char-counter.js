/* eslint-disable no-undef */
$(document).ready(function () {
  $('#tweet-text').on('keyup', function (e) {
    const LIMIT = 140;
    let textLength = $('#tweet-text').val().length;
    const counter = $('.counter');
    counter.val(LIMIT - textLength);
    if (counter.val() < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color','#545149');
    }
  });
});
