"use strict";
var express = require('express');
var router = express.Router();
var cardController = require('../controllers/card');
var validate = require('../services/validator');

router.post('/tokenize', function (req, res, next){
	req._required = [
	'cardno',
	'cvv',
	'expirymonth',
	'expiryyear',
	'validateoption',
	'authmodel'
	];
	next();
},
validate,
cardController.tokenize);

router.post('/charge', function (req, res, next){
	req._required = [
	'amount',
	'cardno',
	'cvv',
	'expirymonth',
	'expiryyear',
	'currency',
	'custid',
	'authmodel',
	'narration',
	'country'
	];
	next();
},
validate,
cardController.charge);

router.post('/validate', function (req, res, next){
	req._required = [
	'otptransactionidentifier',
	'otp'
	];
	next();
},
validate,
cardController.validate);

module.exports = router;
