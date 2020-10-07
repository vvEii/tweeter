/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

$(document).ready(function () {
  loadTweets();
  $('.new-tweet form').on('submit', submitForm);
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
        >${data.content.text}</label
      >
      <textarea name="text"></textarea>
    </div>
    <footer>
      <p>10 days ago</p>
      <p class="icons">some icons</p>
    </footer>
  </article>`;
  return $tweet;
};

const renderTweets = function (tweets) {
  tweets.forEach((item) => {
    let $tweet = createTweetElement(item);
    $('#tweets-container').append($tweet);
  });
};

const submitForm = function (e) {
  e.preventDefault();
  const $form = $(this);
  let data = $form.serialize();
  console.log(data);
  $.post('/tweets/', data)
    .then((res) => {
      console.log('good');
    })
    .catch((err) => {
      console.log(err);
    });
};

const loadTweets = function () {
  $.get('/tweets/')
    .then((res) => {
      renderTweets(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
