// function to escape if user inputs html into textbox
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    ${Math.round((Date.now() - tweetObj.created_at) / 1000 / 60 / 60 / 24)} days
  </div>
  <div>
    <i class="fa fa-heart"></i>
    <i class="fa fa-retweet"></i>
  </div>
</footer>
</article>
`
};

// iterates over array of object(the tweets) and appends
const renderTweets = function (tweets) {
  for (tweet of tweets.reverse()) {
    $('#stored-tweets').append(createTweetElement(tweet));
  }
  return;
};

$(function () {
  // these 2 code block are listening for input in the textbox to initiate or hide
  // error messages
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
        $('#counter').text(140);
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

// allowing user to click on ('Write a new tweet) to toggle textbox for user to input
// new tweets
$(document).ready(function () {
  $('#slide').click(function () {
    $(".new-tweet").slideToggle(300);
    $('#text-box').focus();
  })
  $(".new-tweet").slideUp(0);
})

