'use strict';

angular.module('demoAppApp')
  .controller('ThemeMeCtrl', function ($scope, themeFactory, $rootScope, $location, Auth, socket, $http, $modal, $log) {
  	//Controller for handling anything global - currently handling :
  	//theme
  	//notifications
    //offline
    //actions
    //favorites/publish
    $scope.filterActions = "zzzz";

    $scope.toggleActionsSleek = function(){
      if($scope.filterActions === "zzzz"){
         $scope.filterActions = "";
      }else if($scope.filterActions === ""){
         $scope.filterActions = "zzzz";
      }

    };

     $scope.actionClicked = function(){

      //console.log("clicked");
    };

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
          $scope.prepForOffline = {'type' : 2 , 'content': item.widget.title + ' has been added to Offline'};
          $scope.trackSpace += item.widget.space;
       }else if(event == "deleted"){
          $scope.prepForOffline = {'type' : 3 , 'content': item.widget.title + ' has been removed from Offline'};
          $scope.trackSpace -= item.widget.space;
       }
          themeFactory.setAlert($scope.prepForOffline);
           if ($scope.trackSpace < 25) {
              $scope.offlineLevel = 'success';
            } else if ($scope.trackSpace < 50) {
              $scope.offlineLevel = 'info';
            } else if ($scope.trackSpace < 75) {
              $scope.offlineLevel = 'warning';
            } else {
              $scope.offlineLevel = 'danger';
            }
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


  //favorites/publish

  $scope.openFavorites = function(){
    var name= "ea";
     var modalInstance = $modal.open({
      templateUrl: 'favoriteModal.html',
      controller: 'FavoriteModalCtrl',
      windowClass: 'shareModal',
      resolve: {
        name: function () {
          return name;
        }
    
      }
    });

    modalInstance.result.then(function () {
     
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });



  };
  //global nav object
  $scope.navObject = [{name : 'Education'},{name : 'Manufacturing'},{name : 'Healthcare'},{name : 'Insurance'},{name : 'Field Services'}];

  //detect mobile to disable view swicth animations on and off (off for mobile)
  $scope.isMobileDevice = false;
  function isMobile() {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
      if(!isMobile()){
          $scope.isMobileDevice = true;
      }else{
        $scope.isMobileDevice = false;
      }

      $scope.showGlobalMenu = false;

      $scope.menuToggle = function(){

        $scope.showGlobalMenu = !$scope.showGlobalMenu;
      };

       $scope.categories = [
  { 
    title: 'Education',
    icon: 'fa-graduation-cap',
    shown: false,
    categories: [
      {
        title: 'Laptops',
        shown: false,
        categories: [
          {
            title: 'Ultrabooks',
            shown: false
          },
          {
            title: 'Macbooks',
            shown: false            
          }
        ]
      },

      {
        title: 'Desktops'
      },

      {
        title: 'Tablets',
        shown: false,
        categories: [
          { 
            title: 'Apple',
            shown: false,

          },
          {
            title: 'Android',
        shown: true,

          }
        ]        
      }
    ]
  },

  {
    title: 'Field services',
    icon: 'fa-truck'
  },
  {
    title: 'Insurance',
    icon: 'fa-umbrella'
  },
  {
    title: 'Healthcare',
    icon: 'fa-coffee'
  },
  {
    title: 'Manufacturing',
    icon: 'fa-gears'
  },
  {
    title: 'Retail',
    icon: 'fa-shopping-cart'
  },
  {
    title: 'Hospitality',
    icon: 'fa-heart'
  },
  {
    title: 'Finance',
    icon: 'fa-line-chart'
  },
  {
    title: 'Banking',
    icon: 'fa-money'
  }

];
    
  });
