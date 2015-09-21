/**
 * Created by Syed Rehanuddin on 9/21/15.
 */
var stripePaymentsHandler = require("../../components/payment_handlers/stripe.payment_handler");

exports.charge = function(payment){
    return stripePaymentsHandler.util.Payments.Stripe.doChargeNewCard(payment);
};
