/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json

$(document).ready(function() {
//hide error element tag 
$('.error').hide()


const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}; 


function createTweetElement(object) {
  let $tweet = $('<article/>').addClass("tweet");
  const html = `
  <header class="header-tweet">
  <div class="_spaceTab">
  <div class="left-margin">
  <img class="avatar" src="${object.user.avatars}" alt="${object.user.name}">
  <span class="name">${object.user.name}</span>
  </div>
  <span class="handle"> ${object.user.handle}</span>
  </div>
  </header>
  <section class="tweets">${escapeText(object.content.text)}</section>
  <footer class="_tweet">
  <span class="time"> ${timeago.format(object.created_at)}</span>
  <span class="icons">
  <span class="flag">
  <i class="fa-solid fa-flag" ></i>
  </span>
  <span class="retweet">
  <i class="fa-sharp fa-solid fa-retweet"></i>
  </span>
  <span class="heart">
  
  <i class="fa-solid fa-heart"></i>
  </span>
  </span>
  </footer>
  `

  $tweet.html(html);
  return $tweet;
}

const renderTweets = function(tweets) {
  const container = $('#tweets-container')
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    container.append($tweet);
  }
}

const loadTweets = function() {
  $.ajax("/tweets", { method: 'GET' })
    .then((response) => {
      console.log('RESPONSE', response)
      renderTweets(response);
    })
}

loadTweets();

$('#submit-form').submit(function(event) {
  event.preventDefault();
  const data = $('#tweet-text').serialize();
  console.log('DATA--->', data)
  if (data.length === 0) {
    alert('tweet not present')
    return false
  } if (data.length > 140) {
   $('.error').slideDown();
  } else {
    $('.error').hide()
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: data,
      success: function() {
        loadTweets();
        $('#tweet-text').val('')
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
    console.log('data', data);
  }
})



})

