console.log( ' _____      _               _   _            _      _         _____  _____  __   _____' );
console.log( '|  ___|    (_)             | | | |          | |    | |       / __  \\|  _  |/  | |  ___|' );
console.log( '| |__ _ __  _  ___  _   _  | |_| | __ _  ___| | __ | |_   _  `\' / /\'| |/\' |`| | |___ \\' );
console.log( '|  __| \'_ \\| |/ _ \\| | | | |  _  |/ _` |/ __| |/ / | | | | |   / /  |  /| | | |     \\ \\' );
console.log( '| |__| | | | | (_) | |_| | | | | | (_| | (__|   < _| | |_| | ./ /___\\ |_/ /_| |_/\\__/ /' );
console.log( '\\____/_| |_| |\\___/ \\__, | \\_| |_/\\__,_|\\___|_|\\_(_)_|\\__,_| \\_____/ \\___/ \\___/\\____/' );
console.log( '          _/ |   _   __/ |                            _     _ _' );
console.log( '         |__/   | | |___/                            (_)   (_) |                  ____' );
console.log( '  __ _ _ __   __| |   ___ ___  _ __ ___   ___  __   ___ ___ _| |_   _   _ ___    / __ \\' );
console.log( ' / _` | \'_ \\ / _` |  / __/ _ \\| \'_ ` _ \\ / _ \\ \\ \\ / / / __| | __| | | | / __|  / / _` |' );
console.log( '| (_| | | | | (_| | | (_| (_) | | | | | |  __/  \\ V /| \\__ \\ | |_  | |_| \\__ \\ | | (_| |' );
console.log( ' \\__,_|_| |_|\\__,_|  \\___\\___/|_| |_| |_|\\___|   \\_/ |_|___/_|\\__|  \\__,_|___/  \\ \\__,_|' );
console.log( ' _   _                             _____           _     _                 _   _ \\____/' );
console.log( '| | | |                           / __  \\         | |   | |               | | | |' );
console.log( '| |_| |__   ___   ___ _   _ _ __  `\' / /\' ___ __ _| |_  | |__   ___   ___ | |_| |__' );
console.log( '| __| \'_ \\ / _ \\ / __| | | | \'_ \\   / /  / __/ _` | __| | \'_ \\ / _ \\ / _ \\| __| \'_ \\' );
console.log( '| |_| | | |  __/ \\__ \\ |_| | | | |./ /__| (_| (_| | |_  | |_) | (_) | (_) | |_| | | |' );
console.log( ' \\__|_| |_|\\___| |___/\\__, |_| |_|\\_____/\\___\\__,_|\\__| |_.__/ \\___/ \\___/ \\__|_| |_|' );
console.log( '                       __/ |' );
console.log( '                      |___/' );


var socket = io.connect( 'https://tweets.mona.lu:1337' );
  socket.on('tweet', function ( t ) {

  var profilePic = t.user.profile_image_url_https.replace( '_normal', '' );
  var tweet      = t.text;

  $.each( t.entities.urls, function( key, url ) {
    tweet = tweet.replace( url.url, url.display_url );
  });

  var html  = '<div class="row">'
          + '<div class="col-sm-2 hidden-xs">'
            + '<img class="profilePic" src="' + profilePic + '" />'
          + '</div>'
          + '<div class="col-sm-10">'
            + '<div class="status">' + tweet + '</div>'
            + '<div class="name">' + t.user.name
              + '<span class="screen_name"> @' + t.user.screen_name + '</span>'
            + '</div>'
          + '</div>'
        + '</div>';

  $('.tweets').prepend( html ).fadeIn();
  $('.tweets').children().slice( 15 ).detach();
});

!function ($) {

  $(function(){

    refreshTime();
    setInterval(function() {
      refreshTime();
    }, 1000);

  });
}(window.jQuery);

function refreshTime() {

  var hacklu = moment( [ 2015, 9, 19 ] );
  var diff   = moment().diff( hacklu, 'days' );

  $('.currentDay').text( 'Day ' + diff );
  $('.currentTime').text( moment().format('HH:mm') );
}