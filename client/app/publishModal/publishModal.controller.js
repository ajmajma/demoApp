'use strict';

angular.module('demoAppApp')
  .controller('PublishModalCtrl', function ($scope, $modalInstance, widgets, location ) {

  	$scope.WidgetList = widgets;

  	$scope.whereAmI = location.replace("/", "");


  	$scope.ok = function () {
    	$modalInstance.close($scope.WidgetList);
  	};


  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  	};

  });
