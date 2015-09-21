'use strict';

angular.module('pocApp')
  .controller('PurchaseCtrl', function($scope, $http) {
    var Stripe = window.Stripe;
	
    Stripe.setPublishableKey('YOUR PUBLISHABLE KEY');
    $scope.products = [
      { name : 'Product 1', amount : 10},
      { name : 'Product 2', amount : 5},
      { name : 'Product 3', amount : 11},
      { name : 'Product 4', amount : 22},
      { name : 'Product 5', amount : 50},
      { name : 'Product 6', amount : 30}
    ];

    $scope.obj = {
      product : null,
      amount : null,
      number: '4242424242424242',
      cvc: '123',
      exp_month: '02',
      exp_year: '2017',
      name: 'Rehan uddin',
      address_line1: 'Korangi',
      address_city: 'Karachi',
      address_zip: '6778',
      address_state: 'Sindh',
      address_country: 'Pakistan'
    };

    $scope.amountPopulate = function(){
      for(var i = 0; i < $scope.products.length; i++){
        if($scope.obj.product == $scope.products[i].name){
          $scope.obj.amount = $scope.products[i].amount;
          break;
        }
      }
    };

    $scope.checkout = function(){
      for(var key in $scope.obj) {
        if (!$scope.obj[key]) {
          $scope.msg = 'Please fill all fields';
          return;
        }
      }
      Stripe.card.createToken($scope.obj, stripeResponseHandler);
    };

    function stripeResponseHandler(status, response) {
      if (response.error) {
        // show the errors on the form
        console.log(response.error.message);
        $scope.msg = response.error.message;

      } else {

        $http.post('/payment', {
          payment_method : 'stripe', payment : {
            amount: ($scope.obj.amount * 100), // amount in cents, again
            currency: 'usd',
            source: response.id,
            description: 'Example charge'
          },
          cart : {
            items : [{item_title : $scope.obj.product, unit_price : ($scope.obj.amount * 100), quantity : 1}],
            billed_amount :($scope.obj.amount * 100)
          }
        }).then(function(response) {
          console.log('response');
          console.log(response);

          if(response.status === 200){
            $scope.msg = 'Payment Successful';
          } else {
            $scope.msg = 'Error in processing payment';
          }
        });
      }
    }

  });
