'use strict';

angular.module('demoAppApp')
  .controller('ProfileCtrl', function ($scope) {

  	$scope.sides = [{ 'name' : '1', 'active' : true, 'side' : 'front'},{ 'name' : '2', 'active' : false, 'side' : 'side'},{ 'name' : '3', 'active' : false, 'side' : 'side'},{ 'name' : '4', 'active' : false, 'side' : 'side' },{ 'name' : 'Help', 'active' : false, 'side' : 'help' }];


   $scope.flipLeft = function (index){
    var idx = index - 1;

    if (idx < 0) {
       idx = $scope.sides.length - 1;
    }
    
    $scope.sides[index].active = false;
    $scope.sides[idx].active = true;
};

$scope.flipRight = function (index){
    var idx = index + 1;
    if (idx >= $scope.sides.length) {
       idx = 0;
    }
    $scope.sides[index].active = false;
    $scope.sides[idx].active = true;
};


   $scope.flipHelp = function (index){
    	 $scope.sides[index].active = false;
    	 $scope.indexFind = _.findIndex($scope.sides, function(idx){
    	 	return idx.side == 'help';
    	 });
    	 $scope.sides[$scope.indexFind].active = true;
	};

	$scope.flipHelpBack = function (index){
		 $scope.sides[index].active = false;
    	 $scope.indexFindBack = _.findIndex($scope.sides, function(idx){
    	 	return idx.side == 'front';
    	 });
    	 $scope.sides[$scope.indexFindBack].active = true;
	};

  });
