"use strict";
var config = require('../../config');
var Flutterwave = require('flutterwave');
var q = require('q');
var debug = require('debug')('account');


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

        // Charge (for collecting payment from a bank account)
        /** 
         * @param  {accountNumber}
         * @param  {amountToPay}
         * @param  {creditAccountNumber}
         * @param  {trxref}
         * @param  {narration}
         * @return {Promise}
        */

        charge: function(accountNumber, amountToPay, creditAccountNumber, trxref, narration){
            
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.charge({
                        accountNumber: accountNumber,
                        amountToPay: amountToPay,
                        creditAccountNumber: creditAccountNumber,
                        trxref: trxref,
                        narration: narration,
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

        // Validate (for collecting payment from a bank account)
        /** 
         * @param  {accountToken}
         * @param  {amountToPay}
         * @param  {trxref}
         * @param  {otp}
         * @param  {narration}
         * @reurn  {Promise}
        */
        validate: function(accountToken, amountToPay, trxref, otp){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.validate({
                        accountToken: accountToken, 
                        amountToPay: amountToPay,
                        otp: otp,
                        trxref: trxref
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


        // For initiating reccurrent payment
        /** 
         * @param  {accountNumber}
         * @return {Promise}
        */
        initiateRecurrentPayment: function(accountNumber){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.initiateRecurrentPayment({
                        accountNumber: accountNumber
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

        // Validate (for validating recurrent account)
        /** 
         * @param  {accountNumber}
         * @param  {otp}
         * @param  {reference}
         * @param  {billingamount}
         * @param  {debitnarration}
         * @return {Promise}
        */
        validateRecurrentAccount: function(accountNumber, otp, reference, billingamount, debitnarration){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.validateRecurrentAccount({
                        accountNumber: accountNumber,
                        otp: otp,
                        reference: reference,
                        billingamount: billingamount,
                        debitnarration:billingamount
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

        // Charge (For charging a bank account that has been setup for recurrent payment)
        /** 
         * @param  {accountToken}
         * @param  {billingamount}
         * @param  {debitnarration}
         * @param  {debitnarration}
         * @return {Promise}
        */
        chargeRecurrentAccount: function(accountToken, billingamount, debitnarration){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.chargeRecurrentAccount({
                        accountToken: accountToken, 
                        billingamount: billingamount,
                        debitnarration: debitnarration
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

        // For resolving owners of account
        /** 
         * @param  {destbankcode}
         * @param  {recipientaccount}
         * @return {Promise}
        */
        resolveAccount: function(destbankcode, recipientaccount){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.resolveAccount({
                        destbankcode: destbankcode,
                        recipientaccount: recipientaccount
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

        // linkAccount (for linking a bank account)
        /** 
         * @param  {accountnumber}
         * @return {Promise}
        */
        linkAccount: function(accountnumber){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.linkAccount({
                        accountnumber: accountnumber
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

        // linkAccount (for linking a bank account)
        /** 
         * @param  {otp}
         * @param  {relatedreference}
         * @param  {otptype}
         * @return {Promise}
        */
        validateAccountLinking: function(otp, relatedreference, otptype){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.validateAccountLinking({
                        otp: otp,
                        relatedreference: relatedreference,
                        otptype: otptype
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

        // Get accounts linked to merchant
        /** 
         * @return {Promise}
        */

        getLinkedAccounts: function(otp, relatedreference, otptype){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.getLinkedAccounts({
                        
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

        // For sending payments to accounts
        /** 
         * @param  {accounttoken}
         * @param  {destbankcode}
         * @param  {uniquereference}
         * @param  {country}
         * @param  {currency}
         * @param  {transferamount}
         * @param  {narration}
         * @param  {recipientname}
         * @param  {sendername}
         * @param  {recipientaccount}
         * @return {Promise}
        */
        sendPayment: function(accounttoken, destbankcode, uniquereference, country, currency, transferamount, narration, recipientname, sendername, recipientaccount){
            return q.Promise(function(resolve, reject){
                try{
                    flutterwave.Account.sendPayment({
                        accounttoken: accounttoken,
                        destbankcode: destbankcode,
                        uniquereference: uniquereference,
                        country: country,
                        currency: currency,
                        transferamount: transferamount,
                        narration: narration,
                        recipientname: recipientname,
                        sendername: sendername,
                        recipientaccount: recipientaccount
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
        }






     }
 };