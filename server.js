var express = require('express');
var Config = require('./config');

var app = express();

require('./routes/routes')(app);

app.listen(Config.APP_PORT);
console.log('Server is running on - localhost:' + Config.APP_PORT);