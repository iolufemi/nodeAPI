"use strict";
module.exports = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	trustProxy: process.env.TRUST_PROXY || 'no',
	apiKey: process.env.API_KEY || 'YOUR_API_KEY',
	merchantKey: process.env.MERCHANT_KEY || 'YOUR_MERCHANT_KEY'
};
