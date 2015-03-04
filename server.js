var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.end('Analyse Meetup Attendees')
});

app.get('/api/analyse-meetup', function(req, res) {
  res.json({
    'attendees': []
  });
});

app.listen(9000);