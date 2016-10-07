"use strict";
var config = require('../../config');
var Flutterwave = require('flutterwave');
var q = require('q');
var debug = require('debug')('card');


/**
 * @param  {flutterwaveApiKey}
 * @param  {flutterwaveMerchantKey}
 * @return {object}
 */
 module.exports = function(flutterwaveApiKey, flutterwaveMerchantKey){
 	debug('Flutterwave keys: ', flutterwaveApiKey, flutterwaveMerchantKey);

 	var flutterwave;
 	if(config.env !== "production"){
 		flutterwave = new Flutterwave(flutterwaveApiKey, flutterwaveMerchantKey);
 	}else{
 		flutterwave = new Flutterwave(flutterwaveApiKey, flutterwaveMerchantKey, true);
 	}

 	debug('Flutterwave obj: ', flutterwave);

 	return {
 		base: flutterwave,
	// Tokenize a transaction 
	/**
	 * @param  {cardno}
	 * @param  {cvv}
	 * @param  {expirymonth}
	 * @param  {expiryyear}
	 * @param  {validateoption 'SMS|VOICE'}
	 * @param  {authmodel 'PIN | BVN | RANDOM_DEBIT | VBVSECURECODE | NOAUTH'}
	 * @param  {bvn}
	 * @return {promise}
	 */
	 tokenize: function(cardno, cvv, expirymonth, expiryyear, validateoption, authmodel, bvn){
	 	return q.Promise(function(resolve, reject){
	 		try{
	 			flutterwave.Card.tokenize({
	 				validateoption: validateoption,
	 				authmodel: authmodel,
	 				bvn: bvn,
	 				cardno: cardno,
	 				cvv:cvv,
	 				expirymonth:expirymonth,
	 				expiryyear:expiryyear
	 			}, function(error, response, body){
	 				if(error){
	 					reject(new Error(error));
	 				}else{
	 					var result = body.data;
	 					if(response.flutterwaveRequestSuccessful){
	 						result.requiresValidation = false;
	 					}else{
	 						reject(result);
	 					}

	 					if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
	 					resolve(result);
	 				}
	 			});
	 		}catch(e){
	 			reject(new Error(e));
	 		}
	 	});
	 },

	//Charge a card
	// Note that the country parameter is required if you are specifying a currency other than "NGN"
	/**
	 * @param  {amount}
	 * @param  {cardno}
	 * @param  {cvv}
	 * @param  {expirymonth}
	 * @param  {expiryyear}
	 * @param  {currency}
	 * @param  {custid}
	 * @param  {authmodel}
	 * @param  {narration}
	 * @param  {country}
	 * @param  {responseurl}
	 * @param  {pin}
	 * @param  {bvn}
	 * @return {promise}
	 */
	 charge: function(amount,cardno,cvv,expirymonth,expiryyear,currency,custid,authmodel,narration,country,responseurl,pin,bvn){
	 	return q.Promise(function(resolve, reject){
	 		try{
	 			flutterwave.Card.charge({
	 				amount: amount,
	 				authmodel: authmodel,
	 				cardno: cardno,
	 				currency: currency,
	 				country: country,
	 				custid: custid,
	 				cvv: cvv, 
	 				expirymonth: expirymonth,
	 				pin: pin,
	 				bvn: bvn,
	 				expiryyear: expiryyear, 
	 				narration: narration,
	 				responseurl: responseurl
	 			}, function(error, response, body){
	 				if(error){
	 					reject(new Error(error));
	 				}else{
	 					var result = body.data;
	 					if(response.flutterwaveRequestSuccessful){
	 						result.requiresValidation = false;
	 					}else{
	 						reject(result);
	 					}

	 					if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
	 					resolve(result);
	 				}
	 			});
	 		}catch(e){
	 			reject(new Error(e));
	 		}
	 	});
	 },

	//Validate transaction 
	// (If you pass a value other than NOAUTH to the charge method's authmodel, you need to validate the charge using this method)
	/**
	 * @param  {otptransactionidentifier}
	 * @param  {otp}
	 * @return {promise}
	 */
	 validate: function(otptransactionidentifier, otp){
	 	return q.Promise(function(resolve, reject){
	 		try{
	 			flutterwave.Card.validate( {
	 				otptransactionidentifier: otptransactionidentifier, 
	 				otp: otp
	 			}, function(error, response, body){
	 				if(error){
	 					reject(new Error(error));
	 				}else{
	 					var result = body.data;
	 					if(response.flutterwaveRequestSuccessful){
	 						result.requiresValidation = false;
	 					}else{
	 						reject(result);
	 					}

	 					if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
	 					resolve(result);
	 				}
	 			});
	 		}catch(e){
	 			reject(new Error(e));
	 		}
	 	});
	 },

	//Preauthorize a card
	/**
	 * @param  {chargetoken}
	 * @param  {amount}
	 * @param  {currency}
	 * @return {promise}
	 */
	preauth: function(chargetoken, amount, currency){
		return q.Promise(function(resolve, reject){
			try{
				flutterwave.Card.preauth({
					chargetoken: chargetoken,
					amount: amount,
					currency: currency
				}, function(error, response, body){
					if(error){
						reject(new Error(error));
					}
					else{
						var result=body.data;
						if(response.flutterwaveRequestSuccessful){
							result.requiresValidation=false;
						}
						else{
							reject(result);
						}
						if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
						resolve(result);
					}

				});
			}
			catch(e){

			}
		});
	},

	// Charge card that has been preauthorized
	/**
	 * @param  {amount}
	 * @param  {currency}
	 * @param  {trxreference}
	 * @param {trxauthorizeid}
	 * @return {promise}
	 */
	capture: function(amount, currency, trxreference, trxauthorizeid){
		return q.Promise(function(resolve, reject){
			try{
				flutterwave.Card.capture({
					amount: amount,
					currency: currency,
					trxreference: trxreference,
					trxauthorizeid: trxauthorizeid
				}, function(error, response, body){
					if(error){
						reject(new Error(error));
					}
					else{
						var result=body.data;
						if(response.flutterwaveRequestSuccessful){
							result.requiresValidation=false;
						}
						else{
							reject(result);
						}
						if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
						resolve(result);
					}

				});
			}
			catch(e){

			}
		});
	},

	// Refund the amount preauthed on a card
	/**
	 * @param  {amount}
	 * @param  {currency}
	 * @param  {trxreference}
	 * @param {trxauthorizeid}
	 * @return {promise}
	 */
	void: function(amount, currency, trxreference, trxauthorizeid){
		return q.Promise(function(resolve, reject){
			try{
				flutterwave.Card.void({
					amount: amount,
					currency: currency,
					trxreference: trxreference,
					trxauthorizeid: trxauthorizeid
				}, function(error, response, body){
					if(error){
						reject(new Error(error));
					}
					else{
						var result=body.data;
						if(response.flutterwaveRequestSuccessful){
							result.requiresValidation=false;
						}
						else{
							reject(result);
						}
						if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
						resolve(result);
					}

				});
			}
			catch(e){

			}
		});
	},

	// Reverses a card transaction
	/**
	 * @param  {amount}
	 * @param  {currency}
	 * @param  {trxreference}
	 * @param {trxauthorizeid}
	 * @return {promise}
	 */
	refund: function(amount, currency, trxreference, trxauthorizeid){
		return q.Promise(function(resolve, reject){
			try{
				flutterwave.Card.refund({
					amount: amount,
					currency: currency,
					trxreference: trxreference,
					trxauthorizeid: trxauthorizeid
				}, function(error, response, body){
					if(error){
						reject(new Error(error));
					}
					else{
						var result=body.data;
						if(response.flutterwaveRequestSuccessful){
							result.requiresValidation=false;
						}
						else{
							reject(result);
						}
						if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
						resolve(result);
					}

				});
			}
			catch(e){

			}
		});
	},

	// Get information about a card
	/**
	 * @param  {amount}
	 * @param  {currency}
	 * @param  {trxreference}
	 * @param {trxauthorizeid}
	 * @return {promise}
	 */
	enquiry: function(amount, currency, trxreference, trxauthorizeid){
		return q.Promise(function(resolve, reject){
			try{
				flutterwave.Card.enquiry({
					amount: amount,
					currency: currency,
					trxreference: trxreference,
					trxauthorizeid: trxauthorizeid
				}, function(error, response, body){
					if(error){
						reject(new Error(error));
					}
					else{
						var result=body.data;
						if(response.flutterwaveRequestSuccessful){
							result.requiresValidation=false;
						}
						else{
							reject(result);
						}
						if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
						resolve(result);
					}

				});
			}
			catch(e){

			}
		});
	},

	// Validate enquiry info
	/**
	 * @param  {amount}
	 * @param  {currency}
	 * @param  {trxreference}
	 * @param {trxauthorizeid}
	 * @return {promise}
	 */
	validateEnquiry: function(amount, currency, trxreference, trxauthorizeid){
		return q.Promise(function(resolve, reject){
			try{
				flutterwave.Card.validateEnquiry({
					amount: amount,
					currency: currency,
					trxreference: trxreference,
					trxauthorizeid: trxauthorizeid
				}, function(error, response, body){
					if(error){
						reject(new Error(error));
					}
					else{
						var result=body.data;
						if(response.flutterwaveRequestSuccessful){
							result.requiresValidation=false;
						}
						else{
							reject(result);
						}
						if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
						resolve(result);
					}

				});
			}
			catch(e){

			}
		});
	},

	// Withdraw
	/**
	 * @param  {amount}
	 * @param  {accountno}
	 * @param  {validateoption}
	 * @param {trxreference}
	 * @return {promise}
	 */

	withdraw: function(amount, accountno, validateoption, trxreference){
		return q.Promise(function(resolve, reject){
			try{
				flutterwave.Card.withdraw({
					amount: amount,
					accountno: accountno,
					validateoption: validateoption,
					trxreference: trxreference
				}, function(error, response, body){
					if(error){
						reject(new Error(error));
					}
					else{
						var result=body.data;
						if(response.flutterwaveRequestSuccessful){
							result.requiresValidation=false;
						}
						else{
							reject(result);
						}
						if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
						resolve(result);
					}

				});
			}
			catch(e){

			}
		});
	},

	// Status
	/**
	 * @param {trxreference}
	 * @return {promise}
	 */
	status: function(trxreference){
		return q.Promise(function(resolve, reject){
			try{
				flutterwave.Card.status({

					trxreference: trxreference

				}, function(error, response, body){
					if(error){
						reject(new Error(error));
					}
					else{
						var result=body.data;
						if(response.flutterwaveRequestSuccessful){
							result.requiresValidation=false;
						}
						else{
							reject(result);
						}
						if(response.flutterwaveRequestRequiresValidation){
	 						result.requiresValidation = true;
	 					}
						resolve(result);
					}

				});
			}
			catch(e){

			}
		});
	}


	
};
};
