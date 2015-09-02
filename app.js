/**** Dependencies ****/
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var cors = require('cors');
var app = express();

/**** Mongoose connect ****/
mongoose.connect('mongodb://localhost/maky');

/**** Including features & folders ****/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cors()); // allow cross origin

// routes register
app.use('/api', require('./routes/projects'));
app.use('/api', require('./routes/cards'));

// load all files in models folder
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js')) {
        require(__dirname + '/models/' + filename);
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    // ignore favicon error
    if (req.url === '/favicon.ico') next();
    
    err.status = 404;
    next(err);
});

module.exports = app;