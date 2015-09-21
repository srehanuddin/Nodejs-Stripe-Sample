/**
 * Created by Syaed Rehan uddin on 9/21/15.
 * Stripe related payment and utility functions.
 */
var stripe = require("stripe")(
  "YOUR SECRET KEY"
);
var q = require("q");
exports.util = exports.util || {};
exports.util.Payments = exports.util.Payments || {};
exports.util.Payments.Stripe = exports.util.Payments.Stripe || {};

exports.util.Payments.Stripe.doChargeNewCard = function(payment){
    var deferred = q.defer();
    stripe.charges.create(payment, function(err, charge) {
        if(err){
            console.log("err");
            console.log(err);
            deferred.reject({status : false, err : err});
        }
        else{
            deferred.resolve({status : true, charge : charge});
        }
    });
    return deferred.promise;
};