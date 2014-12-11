'use strict';

angular.module('demoAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/activity', {
        templateUrl: 'app/activity/activity.html',
        controller: 'ActivityCtrl'
      });
  });
