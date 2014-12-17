'use strict';

angular.module('demoAppApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, name) {

  $scope.nameOfWidg = name;

  $scope.myShares = [1,2,3,4,5,6,7,8];

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  });
