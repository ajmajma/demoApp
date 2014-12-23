'use strict';

angular.module('demoAppApp')
  .filter('categoryFilter', function () {
    return function (input) {
      return 'categoryFilter filter: ' + input;
    };
  });
