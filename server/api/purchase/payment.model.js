/**
 * Created by Syed Rehan uddin on 9/21/15.
 */
var mongoose = require("mongoose");
var q = require("q");
var _paymentSchema = new mongoose.Schema({
  transaction_id : String,
  items : [{item_title : String, unit_price : Number, quantity : Number}],
  user_id : mongoose.Schema.ObjectId,
  user_name : String,
  billed_amount : Number,
  stripe_charge : {}
});
var paymentModel = mongoose.model("payments", _paymentSchema);
module.exports.model = paymentModel;

module.exports.save = function(payment){
  var defer = q.defer();
  var _payment = new paymentModel(payment);
  _payment.save(function(err, doc){
    if(err){
      defer.reject(err);
    }
    else{
      defer.resolve(doc);
    }
  });
  return defer.promise;
}

module.exports.find = function(query, options){
  var defer = q.defer();
  if(options.isSingle){
    paymentModel.findOne(query)
      .sort(options.sort_fields || "")
      .select(options.select_fields || "")
      .exec(function(err, doc){
        if(err){
          defer.reject(err)
        }
        else{
          defer.resolve(doc);
        }
      });
  }
  else{
    paymentModel.findOne(query)
      .sort(options.sort_fields || "")
      .limit(options.limit)
      .skip(options.skip)
      .select(options.select_fields || "")
      .exec(function(err, doc){
        if(err){
          defer.reject(err)
        }
        else{
          defer.resolve(doc);
        }
      });
  }
  return defer.promise;
}
