module.exports = function(app) {
    console.log('Initializing Routes');

    var api = require('./api');

    app.use('/', api);
};