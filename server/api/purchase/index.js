/**
 * Created by Syed Rehanuddin on 9/21/15.
 */
'use strict';

var express = require('express');
var paymentController = require("./payment.controller")
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.post('/', auth.isAuthenticated(), stripeController.charge);
router.post('/', auth.isAuthenticated(), paymentController.charge);
module.exports = router;
