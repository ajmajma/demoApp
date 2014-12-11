'use strict';

angular.module('demoAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/offline', {
        templateUrl: 'app/offline/offline.html',
        controller: 'OfflineCtrl'
      });
  });
