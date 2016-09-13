"use strict";
var log = require('../logger');

module.exports = function(data, message){
	log.warn('Sending bad request response: ', data, message || 'bad request');
	if(data){
		this.status(400).json({status: 'error', data: data, message: message ? message : 'bad request'});
	}else{
		this.status(400).json({status: 'error', message: message ? message : 'bad request'});
	}
};