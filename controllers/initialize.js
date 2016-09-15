"use strict";
var encryption = require('../services/encryption');
var config = require('../config');
var debug = require('debug')('initialize');

module.exports = {
	init: function(req, res, next){
		var flutterwaveApiKey = req.header('x-apiKey') ? req.header('x-apiKey') : config.flutterwaveApiKey;
		var flutterwaveMerchantKey = req.header('x-merchantKey') ? req.header('x-merchantKey') : config.flutterwaveApiKey;

		debug('flutterwaveApiKey: ', flutterwaveApiKey);
		debug('flutterwaveMerchantKey: ', flutterwaveMerchantKey);

		encryption.generateKey(flutterwaveApiKey, flutterwaveMerchantKey, 256)
		.then(function(resp){
			res.ok({'x-tag': resp});
		})
		.catch(function(err){
			next(err);
		});
	}
};
