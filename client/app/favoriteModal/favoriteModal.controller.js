'use strict';

angular.module('demoAppApp')
  .controller('FavoriteModalCtrl', function ($scope, $modalInstance, widgets, location) {

  	$scope.WidgetList = widgets;

  	$scope.whereAmI = location.replace("/", "");

  	$scope.editActiveWidgets = function (index) {
  		$scope.WidgetList[index].active = ! $scope.WidgetList[index].active;

  	};

  	$scope.ok = function () {
    	$modalInstance.close($scope.WidgetList);
  	};


  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  	};

  });
