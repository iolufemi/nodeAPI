"use strict";
var flutterwave = require('../services/flutterwave');
var config = require('../config');
var debug = require('debug')('card');

module.exports = {
	tokenize: function(req, res, next){
		debug('what i got: ', req.body);
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var cardno = req.body.cardno;
		var cvv = req.body.cvv;
		var expirymonth = req.body.expirymonth;
		var expiryyear = req.body.expiryyear;
		var validateoption = req.body.validateoption;
		var authmodel = req.body.authmodel;
		var bvn = req.body.bvn;

		card.tokenize(cardno, cvv, expirymonth, expiryyear, validateoption, authmodel, bvn)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	charge: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var amount = req.body.amount;
		var cardno = req.body.cardno;
		var cvv = req.body.cvv;
		var expirymonth = req.body.expirymonth;
		var expiryyear = req.body.expiryyear;
		var currency = req.body.currency;
		var custid = req.body.custid;
		var authmodel = req.body.authmodel;
		var narration = req.body.narration;
		var country = req.body.country;
		var responseurl = req.body.responseurl;
		var pin = req.body.pin;
		var bvn = req.body.bvn;

		card.charge(amount,cardno,cvv,expirymonth,expiryyear,currency,custid,authmodel,narration,country,responseurl,pin,bvn)
		.then(function(resp){
			if(resp.responsehtml && resp.responsehtml !== 'null'){
				resp.responsehtml = card.base.decryptText(resp.responsehtml);
			}
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});

	},

	validate: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var otptransactionidentifier = req.body.otptransactionidentifier;
		var otp = req.body.otp;

		card.validate(otptransactionidentifier, otp)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	},

	preauth: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var chargetoken= req.body.chargetoken;
		var amount= req.body.amount;
		var currency= req.body.currency;

		card.preauth(chargetoken, amount, currency).then(function(resp){
			res.ok(resp);
		}).catch(function(err){
			next(err);
		});

	},

	capture : function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var amount= req.body.amount;
		var currency= req.body.currency;
		var trxreference= req.body.trxreference;
		var trxauthorizeid= req.body.trxauthorizeid;

		card.capture(amount, currency, trxreference, trxauthorizeid).then(function(resp){
			res.ok(resp);
		}).catch(function(err){
			next(err);
		});
	},

	void : function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var amount= req.body.amount;
		var currency= req.body.currency;
		var trxreference= req.body.trxreference;
		var trxauthorizeid= req.body.trxauthorizeid;

		card.void(amount, currency, trxreference, trxauthorizeid).then(function(resp){
			res.ok(resp);
		}).catch(function(err){
			next(err);
		});
	},

	refund : function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var amount= req.body.amount;
		var currency= req.body.currency;
		var trxreference= req.body.trxreference;
		var trxauthorizeid= req.body.trxauthorizeid;

		card.refund(amount, currency, trxreference, trxauthorizeid).then(function(resp){
			res.ok(resp);
		}).catch(function(err){
			next(err);
		});
	},

	enquiry : function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var amount= req.body.amount;
		var currency= req.body.currency;
		var trxreference= req.body.trxreference;
		var trxauthorizeid= req.body.trxauthorizeid;

		card.enquiry(amount, currency, trxreference, trxauthorizeid).then(function(resp){
			res.ok(resp);
		}).catch(function(err){
			next(err);
		});
	}, 

	validateEnquiry: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var amount= req.body.amount;
		var currency= req.body.currency;
		var trxreference= req.body.trxreference;
		var trxauthorizeid= req.body.trxauthorizeid;

		card.validateEnquiry(amount, currency, trxreference, trxauthorizeid).then(function(resp){
			res.ok(resp);
		}).catch(function(err){
			next(err);
		});
	},

	withdraw: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var amount= req.body.amount;
		var accountno= req.body.accountno;
		var validateoption= req.body.validateoption;
		var trxreference= req.body.trxreference;

		card.withdraw(amount, accountno, validateoption, trxreference).then(function(resp){
			res.ok(resp);
		}).catch(function(err){
			next(err);
		});
	},

	status: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveMerchantKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);
		var trxreference= req.body.trxreference;

		card.status(trxreference).then(function(resp){
			res.ok(resp);
		}).catch(function(err){
			next(err);
		});
	}

	

};
