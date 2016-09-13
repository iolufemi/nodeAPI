"use strict";
var express = require('express');
var router = express.Router();

router.post('/tokenize', function (req, res) {
	res.ok({name: req.body});
});

router.post('/charge', function (req, res) {
	res.ok({name: req.body});
});

router.post('/validate', function (req, res) {
	res.ok({name: req.body});
});

module.exports = router;
