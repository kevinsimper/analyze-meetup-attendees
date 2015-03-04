var express = require('express');
var cheerio = require('cheerio');
var request = require('request');

var app = express();

app.get('/', function(req, res) {
  res.end('Analyse Meetup Attendees')
});

app.get('/api/analyze', function(req, res) {
  var data = {
    attendees: []
  };
  request('http://www.meetup.com/Docker-Copenhagen/events/220457268/', function(err, response, body) {
    var $ = cheerio.load(body)
    var members = $('#rsvp-list').children();
    members.each(function(i, elem){
      var link = $(this).find('.member-name a');
      var member = {
        name: link.text().trim(),
        url: link.attr('href')
      };
      data.attendees.push(member);
    });
    res.json(data);
  });
});

app.listen(9000);