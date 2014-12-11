'use strict';

angular.module('demoAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/marketplace', {
        templateUrl: 'app/marketplace/marketplace.html',
        controller: 'MarketplaceCtrl'
      });
  });
