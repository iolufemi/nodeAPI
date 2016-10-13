"use strict";
var express = require('express');
var router = express.Router();
var accountController = require('../controllers/account');
var validate = require('../services/validator');

router.post("/charge", function(req, res, next){
    req._required= [
        'accountNumber',
        'amountToPay',
        'creditAccountNumber',
        'trxref',
        'narration'
    ];
    next();
}, validate,
accountController.charge);

router.post("/validate", function(req, res, next){
    req._required= [
        'accountToken',
        'amountToPay',
        'trxref',
        'otp'
    ];
    next();
}, validate,
accountController.validate);

router.post("/initiateRecurrentPayment", function(req, res, next){
    req._required= [
        'accountNumber'
    ];
    next();
}, validate,
accountController.initiateRecurrentPayment);

router.post("/resolveAccount", function(req, res, next){
    req._required= [
        'destbankcode',
        'recipientaccount'
    ];
    next();
}, validate,
accountController.resolveAccount);

router.post("/validateRecurrentAccount", function(req, res, next){
    req._required= [
        'accountNumber',
        'otp',
        'reference',
        'billingamount',
        'debitnarratio'
    ];
    next();
}, validate,
accountController.validateRecurrentAccount);

router.post("/chargeRecurrentAccount", function(req, res, next){
    req._required= [
        'accountToken',
        'billingamount',
        'debitnarration'
    ];
    next();
}, validate,
accountController.chargeRecurrentAccount);

router.post("/linkAccount", function(req, res, next){
    req._required= [
        'accountnumber'
    ];
    next();
}, validate,
accountController.linkAccount);

router.post("/validateAccountLinking", function(req, res, next){
    req._required= [
        'otp',
        'relatedreference',
        'otptype'
    ];
    next();
}, validate,
accountController.validateAccountLinking);

router.post("/getLinkedAccounts", function(req, res, next){
    req._required= [
        
    ];
    next();
}, validate,
accountController.getLinkedAccounts);

router.post("/sendPayment", function(req, res, next){
    req._required= [
        "accounttoken",
        "destbankcode",
        "uniquereference",
        "country",
        "currency",
        "transferamount",
        "narration",
        "recipientname",
        "sendername",
        "recipientaccount"
    ];
    next();
}, validate,
accountController.sendPayment);







module.exports=router;