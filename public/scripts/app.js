/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



function createTweetElement(tweetObj) {
  return `
<article class="articled-tweets">
<header class="tweet-header">
  <div class="handler">
    <label class="name">${tweetObj.user.name}</label>
    <img class="articled-user" src=${tweetObj.user.avatars}>
    <label class="tweet-handle">@${tweetObj.user.name}</label>
  </div>
</header>
<div class="underline-tweet">
  ${tweetObj.content.text}
</div>
<footer class="footer-tweet">
  <div>
    ${tweetObj.created_at}
  </div>
  <div>
    <i class="fa fa-heart"></i>
    <i class="fa fa-retweet"></i>
  </div>
</footer>
</article>
`
};

const renderTweets = function (tweets) {
  for (tweet of tweets) {
    $('#stored-tweets').append(createTweetElement(tweet));
  }
  return;
}

$(function () {
  const $form = $('form');
  $form.submit(function (event) {
    event.preventDefault();
    const stringifiedTweet = $(this).serialize()
    console.log('Button clicked, performing ajax call...');
    console.log(stringifiedTweet);
    $.post('/tweets', stringifiedTweet).then(() => {
      loadtweets();
    })
  })
});

function loadtweets() {
  $('#stored-tweets').empty()
  $.ajax({
    url: '/tweets',
    success: function (data) {
      renderTweets(data);
    }
  })
};
