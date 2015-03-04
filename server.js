var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.end('Analyse Meetup Atteendees')
});

app.listen(9000);