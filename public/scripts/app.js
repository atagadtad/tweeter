/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  for (tweet of tweets) {
    $('#stored-tweets').append(createTweetElement(tweet));
  }
  return;
}

$(document).ready(function () {
  renderTweets(data);
})


