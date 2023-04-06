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

  //using escape text to prevent script inputs from withtin the app
  const escapeText = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //creating tweet element 
  function createTweetElement(object) {
    //creating jquery variable to create article tag and add tweet class
    let $tweet = $('<article/>').addClass("tweet");
    //using template literal to insert values from object into page to make dynamic.
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
      container.prepend($tweet);
    }
  }

  const loadTweets = function() {
    // tweets route and the method get
    // using .then to render tweets 
    $.ajax("/tweets", { method: 'GET' })
      .then((response) => {
        renderTweets(response);
      })
  }

  loadTweets();

  $('#submit-form').submit(function(event) {
    event.preventDefault();
    const data = $('#tweet-text').serialize();
    if (data.length <= 5) {
      return alert('tweet not present')
    } if (data.length > 145) {
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
    }
  })



})

