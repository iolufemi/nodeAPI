"use strict";
module.exports = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	trustProxy: process.env.TRUST_PROXY || 'no',
	flutterwaveApiKey: process.env.FLUTTERWAVE_API_KEY || 'YOUR_API_KEY',
	flutterwaveMerchantKey: process.env.FLUTTERWAVE_MERCHANT_KEY || 'YOUR_MERCHANT_KEY',
	bugsnagKey: process.env.BUGSNAG_KEY || false,
	secureMode: process.env.SECURE_MODE || false
};
