"use strict";
var flutterwave = require('../services/flutterwave');
var config = require('../config');
var debug = require('debug')('account');

module.exports = {

    charge: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var accountNumber = req.body.accountNumber;
        var amountToPay= req.body.amountToPay;
        var creditAccountNumber = req.body.creditAccountNumber;
        var trxref= req.body.trxref;
        var narration= req.body.narration;
		
		account.charge(account, accountNumber, amountToPay, creditAccountNumber, trxref, narration)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	validate: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var accountToken = req.body.accountToken;
		var amountToPay = req.body.amountToPay;
		var trxref= req.body.trxref;
		var otp = req.body.otp;
		account.validate(accountToken, amountToPay, trxref, otp)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	initiateRecurrentPayment: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var accountNumber = req.body.accountNumber;
		account.initiateRecurrentPayment(accountNumber)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	validateRecurrentAccount: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var accountNumber = req.body.accountNumber;
		var otp = req.body.otp;
		var reference= req.body.reference;
		var billingamount = req.body.billingamount;
		var debitnarration= req.body.debitnarration;
		account.validateRecurrentAccount(accountNumber, otp, reference, billingamount, debitnarration)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	chargeRecurrentAccount: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var accountNumber = req.body.accountNumber;
		var accountToken= req.body.accountToken;
		var billingamount= req.body.billingamount; 
		var debitnarration= req.body.debitnarration;
		account.chargeRecurrentAccount(accountToken, billingamount, debitnarration)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	resolveAccount: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var destbankcode = req.body.destbankcode;
		var recipientaccount= req.body.recipientaccount;

		account.resolveAccount(destbankcode, recipientaccount)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	}, 

	linkAccount: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var accountnumber = req.body.accountnumber;
		account.linkAccount(accountnumber)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	validateAccountLinking: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var otp = req.body.otp;
		var relatedreference= req.body.relatedreference;
		var otptype= req.body.otptype;
		account.validateAccountLinking(otp, relatedreference, otptype)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	getLinkedAccounts: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		account.getLinkedAccounts()
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	sendPayment: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var account = flutterwave.account(flutterwaveApiKey, flutterwaveMerchantKey);
		var accounttoken= req.body.accounttoken;
		var destbankcode= req.body.destbankcode;
		var uniquereference= req.body.uniquereference;
		var country= req.body.country;
		var currency= req.body.currency;
		var transferamount= req.body.transferamount;
		var narration= req.body.narration;
		var recipientname= req.body.recipientname;
		var sendername= req.body.sendername;
		var recipientaccount= req.body.recipientaccount;
		account.sendPayment(accounttoken, destbankcode, uniquereference, country, currency, transferamount, narration, recipientname, sendername, recipientaccount)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	}

}