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
           $scope.trackSpace += val.space;

          });
      socket.syncUpdates('offline', $scope.contentHere, function(event, item, object){
        if(event === "created"){
          $scope.prepForOffline = {'type' : 2 , 'content': item.name + ' has been added to Offline'};
          $scope.trackSpace += item.space;
       }else if(event == "deleted"){
          $scope.prepForOffline = {'type' : 3 , 'content': item.name + ' has been removed from Offline'};
          $scope.trackSpace -= item.space;
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

    //share tracker
    $http.get('/api/alertss').success(function(awesomeThings) {
      $scope.newShareHold = awesomeThings;
      $scope.shareAmount = $scope.newShareHold.length;

      socket.syncUpdates('alerts', $scope.newShareHold, function(event, item, object){
          if(event === "created"){
            console.log("Added");
            $scope.shareAmount += 1;
       }else if(event == "deleted"){ 
          $scope.shareAmount -= 1;
       }
     
      });
    });
    //close socket if user leaves app
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('offline');
    });

    //open share modal
    $scope.openShareModal  = function(name, widg){
    
       var modalInstance = $modal.open({
      templateUrl: 'shareModal.html',
      controller: 'ModalInstanceCtrl',
      windowClass: 'shareModal',
      resolve: {
        name: function () {
          return name;
        },
        widget: function(){
          return widg;
        }
      }
    });

    modalInstance.result.then(function (widget) {
    
       var widgForSend = angular.toJson(widget);
       
      $http.post('/api/alertss', widgForSend );
      $scope.shareSuccess = {'type' : 2 , 'content': 'Share Successful'};
      themeFactory.setAlert($scope.shareSuccess);
    }, function () {
    });
  };


  //favorites/publish modal
  $scope.widgPublishControl = [{'name' : '1', 'active': true},{'name' : '2', 'active': true},{'name' : '3', 'active': false},{'name' : '4', 'active': false},{'name' : '5', 'active': false},{'name' : '6', 'active': false},{'name' : '7', 'active': false},{'name' : '8', 'active': false},{'name' : '9', 'active': false},{'name' : '10', 'active': false},{'name' : '11', 'active': false},{'name' : '12', 'active': false}];

  $scope.openFavorites = function(){

     var modalInstance = $modal.open({
      templateUrl: 'favoriteModal.html',
      controller: 'FavoriteModalCtrl',
      windowClass: 'shareModal',
      size: 'sm',
      resolve: {
        widgets: function () {
          return $scope.widgPublishControl;
        },
        location: function(){
          return $location.path();
        }
    
      }
    });

    modalInstance.result.then(function () {
     
    }, function () {
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

    //Object for Global Nav
    $scope.categoriess = [
    { 
    title: 'Favorites',
    icon: 'fa-heart',
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
//Object for Global Nav
    $scope.categoriesForMarket = [
    { 
    title: 'Education',
    icon: 'fa-graduation-cap',
    shown: false,
    categories: [
      {
        title: 'Teaching Resource',
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
        title: ' Learning Resources'
      },
      {
        title: ' Financial Administration'
      },
      {
        title: ' Staff Resources'
      },
      {
        title: ' Student Resources'
      },
      {
        title: ' Program Management'
      },
      {
        title: ' Room Scheduling'
      },
      {
        title: ' Managing Student'
      },
      {
        title: ' Parent Resources'
      },
      {
        title: 'Reporting',
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
//gobal nav modal
$scope.openGlobalMenu = function(){
   
     var modalInstance = $modal.open({
      templateUrl: 'globalMenu.html',
      controller: 'GlobalMenuCtrl',
      windowClass: 'menuModal',
      resolve: {
        menu: function () {
          return $scope.categoriess;
        }
    
      }
    });

    modalInstance.result.then(function () {
     
    }, function () {

    });
  };


  $scope.openPublishMenu = function(){
   
     var modalInstance = $modal.open({
      templateUrl: 'publishModal.html',
      controller: 'PublishModalCtrl',
      windowClass: 'publishModal',
      resolve: {
         widgets: function () {
          return $scope.widgPublishControl;
        },
        location: function(){
          return $location.path();
        }
    
      }
    });

    modalInstance.result.then(function () {
     
    }, function () {
      
    });
  };


  });


