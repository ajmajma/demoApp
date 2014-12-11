'use strict';

angular.module('demoAppApp')
  .controller('ThemeMeCtrl', function ($scope, themeFactory, $rootScope, $location, Auth, socket, $http, $modal, $log) {
  	//Controller for handling anything global - currently handling :
  	//theme
  	//notifications
    $scope.modalOpen = false;

    //check our location
    $scope.locationPlease = function(route) {
      return route === $location.path();
    };


    $scope.alertArray = [];
    $scope.modalInfo = {}
    //watch for modals
     $scope.$on(themeFactory.modalOpened, function (e, modal) {
         $scope.modalOpen = true;
         $scope.modalInfo = modal;
      });

     $scope.closeNative = function(){
        $scope.modalOpen = false;
     };
 
    //watch for alerts
    $scope.$on(themeFactory.alertOpened, function (e, alert) {
         $scope.alertArray.push(alert);
      });

    //track available space left for offline
    $scope.trackSpace = 0;
    $http.get('/api/offlines').success(function(awesomeThings) {
      $scope.contentHere = awesomeThings;
      angular.forEach($scope.contentHere, function(val) {
           $scope.trackSpace += val.widget.space;

          });
      socket.syncUpdates('offline', $scope.contentHere, function(event, item, object){
        if(event === "created"){
          $scope.prepForOffline = {'type' : 1 , 'content': item.widget.title + ' has been added to Offline'};
          $scope.trackSpace += item.widget.space;
       }else if(event == "deleted"){
          $scope.prepForOffline = {'type' : 3 , 'content': item.widget.title + ' has been removed from Offline'};
          $scope.trackSpace -= item.widget.space;
       }
          themeFactory.setAlert($scope.prepForOffline);
      });
    });
    //close socket if we ever leave app
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('offline');
    });

    $scope.openShareModal  = function(name){
    
       var modalInstance = $modal.open({
      templateUrl: 'shareModal.html',
      controller: 'ModalInstanceCtrl',
      windowClass: 'shareModal',
      resolve: {
        name: function () {
          return name;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



    
  });
