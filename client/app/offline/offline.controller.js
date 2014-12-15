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


  });
