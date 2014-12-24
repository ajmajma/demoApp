'use strict';

angular.module('demoAppApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, name,  widget, User) {

  $scope.users = User.query();
  $scope.nameOfWidg = name;
  $scope.passWidg = widget;
  console.log($scope.passWidg);
    $scope.shareBase = function (index){
    $scope.users[index].shareBase = ! $scope.users[index].shareBase;

  };

  $scope.shareFull = function (index){

    $scope.users[index].shareFull = ! $scope.users[index].shareFull;

  };

  $scope.myShares = [1,2,3,4,5,6,7,8];

  $scope.ok = function () {
    $modalInstance.close($scope.passWidg);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  });
