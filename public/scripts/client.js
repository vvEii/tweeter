/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const LIMIT = 140;

$(document).ready(() => {
  loadTweets();
  $('.new-tweet-container form').on('submit', submitForm);
});

const createTweetElement = (data) => {
  //tweet posted date
  const dateCreated = new Date(data.created_at).toLocaleDateString();
  let $tweet = `        
    <article class="tweet">
    <header>
      <img src=${data.user.avatars} />
      <p class="user">${data.user.name}</p>
      <p class="handle">${data.user.handle}</p>
    </header>
    <div class="tweet-content">
      <p>${escape(data.content.text)}</p>
    </div>
    <footer>
      <p>${dateCreated}</p>
      <div class="icons-container">
      <i class="fas fa-flag"></i>&nbsp;
      <i class="fas fa-retweet"></i>&nbsp;
      <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

//preventing XSS with escaping
const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = (tweets) => {
  tweets.reverse();
  tweets.forEach((item) => {
    let $tweet = createTweetElement(item);
    $('.tweets-container').append($tweet);
  });
};

const submitForm = (e) => {
  e.preventDefault();
  const $form = $('form');
  const $textarea = $('textarea');
  const textLength = $textarea.val().length;
  const $section = $('.new-tweet-container');
  const errOverLimit = 'The tweet is too long, keep it below 140 words.';
  const errEmpty = "❗The tweet can't be empty.❗";
  $('.err').remove();

  if (textLength > LIMIT || $textarea.val() === '') {
    const errMessage = textLength > LIMIT ? errOverLimit : errEmpty;
    const $errMessage = $(`<p>${errMessage}</p>`).addClass('err');
    $section.prepend($errMessage);
    $errMessage.hide();
    $errMessage.slideDown('slow');
    return;
  }
  const data = $form.serialize();
  $.post('/tweets/', data)
    .then(() => {
      loadTweets();
    })
    .catch((err) => {
      console.log(err);
    });
  $textarea.val('');
  $('.counter').val(140);
};

const loadTweets = () => {
  $.get('/tweets/')
    .then((res) => {
      $('.tweets-container').empty();
      renderTweets(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
