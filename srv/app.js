var fs =    require('fs');

var options = {
    key:    fs.readFileSync('ssl.key'),
    cert:   fs.readFileSync('ssl.crt'),
    ca:     fs.readFileSync('ssl.ca')
};

var app = require('https').createServer( options, handler ),
    io = require('socket.io').listen(app),
    sys = require('sys'),
    port = 1337;
    twitter = require('twitter');

app.listen(port);

var twit = new twitter({
  consumer_key:         '',
  consumer_secret:      '',
  access_token_key:     '',
  access_token_secret:  ''
});

function handler (req, res) {
  res.writeHead(302, {
    'Location': 'https://twitter.com/@faq'
  });
  res.end();
}

var twee = io.of('tweet');

twit.stream('statuses/filter', { track: 'hacklu2015bazaar,hacklu2015,hacklu15,hacklu,hack_lu,hack.lu' }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data);
    console.log(data.text);
  });
});
