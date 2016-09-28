"use strict";
var chai = require('chai');
chai.should();
var initialize = require('../controllers/initialize');
var card = require('../controllers/card');

describe('#CardPayments', function(){
	it('should be an object');
	it('should tokenize card');
	it('should charge card');
	it('should validate card');
	it('should charge using a token');
	it('should preauth a card transaction');
	it('should capture a card transaction');
	it('should refund a captured transaction');
	it('should void a preauth transaction');
	it('should get information about a card');
	it('should withdraw from a card');
	it('should verify the status of a transaction');
});

describe('#Initialize', function(){
	it('respond with x-tag');
})
