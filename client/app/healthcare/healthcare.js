'use strict';

angular.module('demoAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/Healthcare', {
        templateUrl: 'app/healthcare/healthcare.html',
        controller: 'HealthcareCtrl'
      });
  });
