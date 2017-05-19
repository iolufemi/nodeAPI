"use strict";
var express = require('express');
var router = express.Router();
var response = require('../services/response');
var encryption = require('../services/encryption');
var bodyParser = require('body-parser');
var log = require('../services/logger');
var me = require('../package.json');
var card = require('./card');
var account= require('./account');
var initialize = require('./initialize');
var expressValidator = require('express-validator');
var cors = require('cors');

router.use(cors());
router.use(response);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.raw());
router.use(bodyParser.text());
router.use(encryption.interpreter);
router.use(expressValidator());

router.use(function(req,res,next){
	log.info('[TIME: '+new Date().toISOString()+'] [IP Address: '+req.ip+'] [METHOD: '+req.method+'] [URL: '+req.originalUrl+']');
	next();
});

router.options('*', cors());

router.get('/', function (req, res) {
	res.ok({name: me.name, version: me.version});
});

router.get('/.well-known/acme-challenge/xvArhQBSilF4V30dGUagNAZ96ASipB0b0ex0kXn0za8', function(req,res){
	res.send('xvArhQBSilF4V30dGUagNAZ96ASipB0b0ex0kXn0za8._v6aFbaRYWeOmSebtlD-X4Ixf5tPsyULMsXM8HjsK-Q');
});

router.use('/card', card);
router.use('/account', account);

router.use('/', initialize);

router.use(function(req, res, next) { // jshint ignore:line
	res.notFound();
});

router.use(log.errorHandler);

module.exports = router;
