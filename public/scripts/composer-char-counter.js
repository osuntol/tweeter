$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const tweet = $(this).val();
    const $counter = $(this).parent().find('.counter');
    // console.log('LENGTH', tweet.length)
    //console.log('TEST', $counter.val(140 - tweet.length))
    $counter.val(140 - tweet.length)
    console.log('COUNTER', $counter.val())
    if ( $counter.val() < 0) {
      $('.counter').css('color', 'red')
    } else {
      $('.counter').css('color','#545149')
    }

    //console.log($(this).parent().find('.counter'))
  })
})
