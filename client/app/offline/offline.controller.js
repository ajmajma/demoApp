'use strict';

angular.module('demoAppApp')
  .controller('OfflineCtrl', function ($scope, $http, socket, Auth, $sce, themeFactory, $rootScope) {
    
  	 $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

  
    $http.get('/api/offlines').success(function(awesomeThings) {

      $scope.contentHere = awesomeThings;
      socket.syncUpdates('offline', $scope.contentHere, function(event, item, object){


      });

    });

    $scope.deleteAlert = function(thing) {
      $http.delete('/api/offlines/' + thing._id);
    };

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('offline');
    // });

     $scope.exampleData = [
     	{ key: "One", y: 5 },
         { key: "Two", y: 2 },
         { key: "Three", y: 9 },
         { key: "Four", y: 7 },
         { key: "Five", y: 4 },
         { key: "Six", y: 3 },
         { key: "Seven", y: 9 }
    ];

    //flip to help
    $scope.flipHelp = function(index, parent){
        $scope.contentHere[parent].sides[index].active = false;
       $scope.indexFind = _.findIndex($scope.contentHere[parent].sides, function(idx){
        return idx.sideIs == 'help';
       });
       $scope.contentHere[parent].sides[$scope.indexFind].active = true;
    };
    //flip back from help
    $scope.flipHelpBack = function(index, parent){
       $scope.contentHere[parent].sides[index].active = false;
       $scope.indexFind = _.findIndex($scope.contentHere[parent].sides, function(idx){
        return idx.sideIs == 'front';
       });
       $scope.contentHere[parent].sides[$scope.indexFind].active = true;
    };
    //flip right
    $scope.flipSideRight = function(index, parent){
     

      $scope.contentHere[parent].sides[index].active = false;
      var idx = index + 1;
      if(idx >= $scope.contentHere[parent].sides.length){
         idx = 0;
      }else{}
      if($scope.contentHere[parent].sides[idx].sideIs == 'help'){
           $scope.flipSideRight(idx, parent); //Added to skip over to next item
           $scope.contentHere[parent].sides[index].active = false;
           return; // Added to skip execution of following line of codes incase of recursion
      }else{}
      $scope.contentHere[parent].sides[index].active = false;
      $scope.contentHere[parent].sides[idx].active = true;
    };

    //flip left
    $scope.flipSideLeft = function(index, parent){

      var idx = index - 1;
      if (idx < 0) {
       idx = $scope.contentHere[parent].sides.length - 1;
      }else{}
      if($scope.contentHere[parent].sides[idx].sideIs == 'help'){
           $scope.flipSideLeft(idx, parent); //Added to skip over to next item
           $scope.contentHere[parent].sides[index].active = false;
           return; // Added to skip execution of following line of codes incase of recursion
      }else{}
      $scope.contentHere[parent].sides[index].active = false;
      $scope.contentHere[parent].sides[idx].active = true;
    };


  });
