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

router.post("/preauth", function(req, res, next){
	req._required=[
		'chargetoken',
		'amount',
		'currency'
	];
	next();
},
validate, 
cardController.preauth);

router.post("/capture", function(req, res, next){
	req._required=[
		'amount',
		'currency',
		'trxreference',
		'trxauthorizeid'
	];
	next();
},
validate, 
cardController.capture);

router.post("/void", function(req, res, next){
	req._required=[
		'amount',
		'currency',
		'trxreference',
		'trxauthorizeid'
	];
	next();
},
validate, 
cardController.void);

router.post("/refund", function(req, res, next){
	req._required=[
		'amount',
		'currency',
		'trxreference',
		'trxauthorizeid'
	];
	next();
},
validate, 
cardController.refund);

router.post("/enquiry", function(req, res, next){
	req._required=[
		'amount',
		'currency',
		'trxreference',
		'trxauthorizeid'
	];
	next();
},
validate, 
cardController.enquiry);

router.post("/validateEnqiry", function(req, res, next){
	req._required=[
		'amount',
		'currency',
		'trxreference',
		'trxauthorizeid'
	];
	next();
},
validate, 
cardController.validateEnquiry);

router.post("/withdraw", function(req, res, next){
	req._required=[
		'amount',
		'accountno',
		'validateoption',
		'trxreference'
	];
	next();
},
validate, 
cardController.withdraw);

router.post("/status", function(req, res, next){
	req._required=[
		'trxreference'
	];
	next();
},
validate, 
cardController.status);

module.exports = router;
