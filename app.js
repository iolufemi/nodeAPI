"use strict";
var express = require('express');
var app = express();
var log = require('./services/logger');
var config = require('./config');
var response = require('./services/response');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use(response);
app.use(function(req,res,next){
    log.info('[TIME: '+new Date().toISOString()+'] [IP Address: '+req.ip+'] [METHOD: '+req.method+'] [URL: '+req.originalUrl+']');
    next();
});


if(config.trustProxy === 'yes'){
    app.enable('trust proxy');
}


app.get('/', function (req, res) {
  res.ok(req.query);
});

app.post('/', function (req, res) {
  res.ok(req.body);
});

app.use(function(req, res, next) { // jshint ignore:line
  res.notFound();
});

app.use(log.errorHandler);

app.listen(config.port, function () {
  log.info('listening on port '+config.port+'!');
});


