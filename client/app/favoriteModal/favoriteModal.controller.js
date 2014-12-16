'use strict';

angular.module('demoAppApp')
  .controller('FavoriteModalCtrl', function ($scope, $modalInstance, name) {

  	$scope.ok = function () {
    	$modalInstance.close();
  	};

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  	};

  });
