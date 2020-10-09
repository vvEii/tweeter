/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const LIMIT = 140;

$(document).ready(function () {
  loadTweets();
  $('.new-tweet-container form').on('submit', submitForm);
});

const createTweetElement = function (data) {
  let $tweet = `        
    <article class="tweet">
    <header>
      <img src=${data.user.avatars} />
      <p class="user">${data.user.name}</p>
      <p class="handle">${data.user.handle}</p>
    </header>
    <div class="tweet-content">
      <label for="tweet-text"
        >${escape(data.content.text)}</label
      >
      <textarea name="text"></textarea>
    </div>
    <footer>
      <p>10 days ago</p>
      <div class="icons-container">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

//preventing XSS with escaping
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function (tweets) {
  tweets.reverse();
  tweets.forEach((item) => {
    let $tweet = createTweetElement(item);
    $('.tweets-container').append($tweet);
  });
};

const submitForm = function (e) {
  e.preventDefault();
  const $form = $(this);
  const $textarea = $('textarea');
  const data = $form.serialize();
  const slicedData = data.slice(5);
  const $section = $('.new-tweet-container');
  const errOverLimit = 'The tweet is too long, keep it below 140 words.';
  const errEmpty = "❗The tweet can't be empty.❗";
  $('.err').remove();
  if (slicedData.length > LIMIT) {
    const $errMessage = $(`<p>${errOverLimit}</p>`).addClass('err');
    $section.prepend($errMessage);
    $errMessage.hide();
    $errMessage.slideDown('slow');
    return;
  }
  if (slicedData === '') {
    const $errMessage = $(`<p>${errEmpty}</p>`).addClass('err');
    $section.prepend($errMessage);
    $errMessage.hide();
    $errMessage.slideDown('slow');
    return;
  }
  $.post('/tweets/', data)
    .then((res) => {
      loadTweets();
    })
    .catch((err) => {
      console.log(err);
    });
  $textarea.val('');
  $('.counter').val(140);
};

const loadTweets = function () {
  $.get('/tweets/')
    .then((res) => {
      $('.tweets-container').empty();
      renderTweets(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
