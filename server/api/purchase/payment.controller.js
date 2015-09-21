/**
 * Created by Syed Rehan uddin on 9/21/15.
 */

var stripePaymentsHandler = require("../../components/payment_handlers/stripe.payment_handler");
var paymentRepository = require("./payment.model");
exports.charge = function(req, res){
  if(req.body.payment_method.trim().toUpperCase() === "STRIPE"){
    stripePaymentsHandler.util.Payments.Stripe.doChargeNewCard(req.body.payment)
      .then(function(charge){
        console.log("Charge!");
        console.log(charge);
        var payment = req.body.cart;
        payment.stripe_charge = charge;
        payment.user_id = req.user._id;
        payment.user_name = req.user.name;
        console.log("Payment");
        console.log(payment);
        paymentRepository.save(payment)
          .then(function(paymentSaveSuccess){
            res.status(200).json({payment_success : true, payment_save_success : true});
          }, function(paymentSaveError){
            res.status(500).json({payment_success : true, payment_save_success : false});
          });
      }, function(paymentSaveError){
        res.json(500, {payment_success : false, payment_save_success : false, error : paymentSaveError});
      });
  }
  else{
    // TO DO if Requested for Paypal or bit coin
    res.status(403).json({error : "Unsupported Payment Method Requested!"});
  }
};
