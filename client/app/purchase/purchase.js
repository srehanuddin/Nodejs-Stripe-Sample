'use strict';

angular.module('pocApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('purchase', {
        url: '/purchase',
        templateUrl: 'app/purchase/purchase.html',
        controller: 'PurchaseCtrl'
      });

  });
