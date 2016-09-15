"use strict";
var flutterwave = require('../services/flutterwave');
var config = require('../config');

module.exports = {
	tokenize: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveApiKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);

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
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveApiKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);

		card.charge(amount,cardno,cvv,expirymonth,expiryyear,currency,custid,authmodel,narration,country,responseurl,pin,bvn)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});

	},

	validate: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveApiKey;
		var card = flutterwave.card(flutterwaveApiKey, flutterwaveMerchantKey);

		card.validate(otptransactionidentifier, otp)
		.then(function(resp){
			res.ok(resp);
		})
		.catch(function(err){
			next(err);
		});
	}

}
