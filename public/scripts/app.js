/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweetObj) {
  const userText = tweetObj.content.text;
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
  ${escape(userText)}
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

  $('#text-box').on('input', function () {
    let textLength = $('#text-box').val().length;
    if (textLength > 0 && textLength < 140) {
      $('#errorMsg').slideUp(300);
    } else if (textLength > 140) {
      $('#errorMsg').html(`You dun goofed. You filled in too much. Remedy that.`)
      $('#errorMsg').css("color", "red")
      $('#errorMsg').slideDown(300)
    }
  })

  $form.submit(function (event) {
    event.preventDefault();
    const stringifiedTweet = $(this).serialize()
    let textLength = $('#text-box').val().length;
    if (textLength === 0) {
      $('#errorMsg').html(`You dun goofed. You didn't fill anything in. Remedy that.`)
      $('#errorMsg').css("color", "red")
      $('#errorMsg').slideDown(300)
    } else if (textLength > 140) {
      $('#errorMsg').html(`You dun goofed. You filled in too much. Remedy that.`)
      $('#errorMsg').css("color", "red")
      $('#errorMsg').slideDown(300)
    } else {
      $.post('/tweets', stringifiedTweet).then(() => {
        $('#stored-tweets').empty()
        loadtweets();
        this.reset();
      })
    }
  })
});

function loadtweets() {

  $.ajax({
    url: '/tweets',
    success: function (data) {
      renderTweets(data);
    }
  })
};


$(document).ready(function () {
  $('#slide').click(function () {
    $(".new-tweet").slideToggle(300);
    $('#text-box').focus();
  })
})

