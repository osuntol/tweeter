$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const tweet = $(this).val();
    const $counter = $(this).parent().find('.counter');
    $counter.val(140 - tweet.length)
    if ( $counter.val() < 0) {
      $('.counter').css('color', 'red');
     
    } else {
      $('.counter').css('color','#545149');
    }

  })
})
