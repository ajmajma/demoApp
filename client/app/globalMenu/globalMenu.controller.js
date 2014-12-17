'use strict';

angular.module('demoAppApp')
  .controller('GlobalMenuCtrl', function ($scope, $modalInstance, menu) {
    $scope.categories = menu;

     $scope.ok = function () {
     	$scope.categories = [];
    	$modalInstance.close();
  };

  $scope.cancel = function () {
  	$scope.categories = [];
    $modalInstance.dismiss('cancel');
  };
  });
