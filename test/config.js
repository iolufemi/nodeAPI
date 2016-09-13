"use strict";
var chai = require('chai');
chai.should();
var config = require('../config');

describe('#config', function(){
	it('should be an object', function(done){
		config.should.be.an('object');
		done();
	});
});
