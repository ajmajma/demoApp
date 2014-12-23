'use strict';

angular.module('demoAppApp')
  .controller('MarketModalCtrl', function ($scope, $modalInstance, widget ) {

  	$scope.Widg = widget;

  	$scope.ok = function () {
    	$modalInstance.close();
  	};


  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  	};  

  });
