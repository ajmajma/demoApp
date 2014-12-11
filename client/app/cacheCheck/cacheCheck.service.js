'use strict';

angular.module('demoAppApp')
  .factory('cacheCheck', function () {
    // Service logic
    // ...
    var meaningOfLife = 42;

    return {
      checkSize: function () {
        return meaningOfLife;
      }
    };
  });
