"use strict";
var express = require('express');
var router = express.Router();
var response = require('../services/response');
var encryption = require('../services/encryption');
var bodyParser = require('body-parser');
var log = require('../services/logger');
var me = require('../package.json');
var card = require('./card');
var initialize = require('./initialize');
var expressValidator = require('express-validator');

router.use(function(req,res,next){
	log.info('[TIME: '+new Date().toISOString()+'] [IP Address: '+req.ip+'] [METHOD: '+req.method+'] [URL: '+req.originalUrl+']');
	next();
});

router.use(response);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.raw());
router.use(bodyParser.text());
router.use(encryption.interpreter);
router.use(expressValidator());


router.get('/', function (req, res) {
	res.ok({name: me.name, version: me.version});
});

router.use('/card', card);

router.use('/', initialize);

router.use(function(req, res, next) { // jshint ignore:line
	res.notFound();
});

router.use(log.errorHandler);

module.exports = router;
