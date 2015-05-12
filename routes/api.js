var express = require('express');
var router = express.Router();
var request = require('request');
var Config = require('./../config');

router.get('/', function(req, res) {
    res.end('Analyse Meetup Attendees')
});

router.get('/api/analyze', function(req, res) {
    if (!req.query.url) {
        res.json({err:'no url param'});
        return;
    }

    var resultFullInfo = false;
    if (req.query.resultFullInfo) {
        resultFullInfo = true;
    }

    var urlParts = req.query.url.split('/');
    var evetId = (urlParts[urlParts.length-1].length) ? urlParts[urlParts.length-1] : urlParts[urlParts.length-2];
    var url = 'https://api.meetup.com/2/rsvps?event_id=' + evetId + '&key=' + Config.API_KEY;

    request(url, function(err, response, body) {
        var data = JSON.parse(body);
        var result = [];

        if (response.statusCode !== 200) {
            res.status(response.statusCode).json(data);
            return;
        }

        var getMemberUrl = function(member_id) {
            return 'http://www.meetup.com/members/' + member_id + '/';
        };

        if (resultFullInfo) {
            data.results.forEach(function(user) {
                user.member.member_url = getMemberUrl(user.member.member_id);
                result.push(user.member);
            });
        } else {
            data.results.forEach(function(user) {
                var userUrl = getMemberUrl(user.member.member_id);
                result.push(userUrl);
            });
        }

        res.json(result);
    });
});

module.exports = router;