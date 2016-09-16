"use strict";
var util = require('util');
var debug = require('debug')('validator');

module.exports = function(req, res, next){
	debug('starting validation check.');
	var parameters = req._required;
	if(parameters.length){
		var last = parameters.length - 1;
		for(var n in parameters){
			debug('validating '+parameters[n]);
			req.check(parameters[n], parameters[n]+' is required').notEmpty();

			if((n*1) === last){
				debug('validation over, lets take it home...');
				var errors = req.validationErrors();
				if (errors) {
					res.badRequest(util.inspect(errors), 'Validation error.');
				}else{
					next();
				}
			}
		}
	}else{
		next();
	}
	
}
