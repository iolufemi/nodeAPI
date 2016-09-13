"use strict";
var log = require('../logger');

module.exports = function(data, message){
	log.warn('sending unauthorized response: ', data, message || 'unauthorized');
	if(data){
		this.status(401).json({status: 'error', data: data, message: message ? message : 'unauthorized'});
	}else{
		this.status(401).json({status: 'error', message: message ? message : 'unauthorized'});
	}
};
