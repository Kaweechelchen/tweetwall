var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    sys = require('sys'),
    port = process.env.PORT || 80;
    twitter = require('twitter');

app.listen(port);

var twit = new twitter({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token_key:     process.env.access_token_key,
  access_token_secret:  process.env.access_token_secret
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var twee = io.of('tweet');


twit.stream('statuses/filter', { track: 'luxembourg,hack,hacklu,hack_lu,hack.lu' }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data);
    console.log('data.text');
  });
});
