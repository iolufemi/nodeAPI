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

	// TODO: Place a hold on an amount for a given card without actually charging the card
	preauth: function(){
		return true;
	},

	// TODO: Charge a card that's been preauthorized
	capture: function(){
		return true;
	},

	// TODO: Refund the amount preauthed on a card
	void: function(){
		return true;
	},

	// TODO: Reverses a card transaction
	refund: function(){
		return true;
	}
};
};
