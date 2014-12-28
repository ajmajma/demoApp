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
      $scope.trackDat = awesomeThings;
      angular.forEach($scope.trackDat, function(val) {
           $scope.trackSpace += val.space;

          });
      socket.syncUpdates('offline', $scope.trackDat, function(event, item, object){
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
          return $scope.contentHereCurrent;
        },
        location: function(){
          return $location.path();
        }
    
      }
    });

    modalInstance.result.then(function (newWidgets) {
      $scope.contentHereCurrent = newWidgets;
     
    }, function () {
      
    });
  };

   //content for main page
        $scope.contentHereCurrent = [
    {
      'size' : '0',
      'name' : 'Utility Alerts',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Utility Alerts',
          'content' : '<div class="utilityAlert"><p>Nunc tincidunt ornare orci, nec suscipit nisl viverra a. Praesent felis dolor, congue sed tempus a, tincidunt eu ligula. In vestibulum venenatis lacus non sodales. Praesent convallis erat eget nisl tristique pellentesque non a urna. Sed mattis ligula purus, ut accumsan arcu placerat ac. Sed sollicitudin arcu at purus ultricies ornare. Nullam efficitur sed sapien vitae tempor. Donec volutpat nunc vel neque volutpat, in iaculis nibh ullamcorper.</p></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '<p>Side 1</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      {
      'size' : 'darkMe',
      'name' : 'Utility Alerts',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],

      'sides' : [
        {
          'title' : 'Utility Alerts',
          'content' : '<div class="utilityAlert"><p>Nunc tincidunt ornare orci, nec suscipit nisl viverra a. Praesent felis dolor, congue sed tempus a, tincidunt eu ligula. In vestibulum venenatis lacus non sodales. Praesent convallis erat eget nisl tristique pellentesque non a urna. Sed mattis ligula purus, ut accumsan arcu placerat ac. Sed sollicitudin arcu at purus ultricies ornare. Nullam efficitur sed sapien vitae tempor. Donec volutpat nunc vel neque volutpat, in iaculis nibh ullamcorper.</p></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '<p>Side 1</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
       {
      'size' : 'w3',
      'name' : 'Statistics',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'sides' : [
        {
          'title' : 'Statistics',
          'content' : '<nvd3-stacked-area-chart data="exampleData" id="exampleId" showXAxis="true" showYAxis="true" showControls="true" responsive="true"  height="220"> <svg></svg> </nvd3-stacked-area-chart>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '<p>Alternative graph 1</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Alternative graph 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Alternartive graph 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Documentation for graphs</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      {
      'size' : '0',
      'name' : 'Utility Alerts',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Utility Alerts',
          'content' : '<div class="utilityAlert"><p>Nunc tincidunt ornare orci, nec suscipit nisl viverra a. Praesent felis dolor, congue sed tempus a, tincidunt eu ligula. In vestibulum venenatis lacus non sodales. Praesent convallis erat eget nisl tristique pellentesque non a urna. Sed mattis ligula purus, ut accumsan arcu placerat ac. Sed sollicitudin arcu at purus ultricies ornare. Nullam efficitur sed sapien vitae tempor. Donec volutpat nunc vel neque volutpat, in iaculis nibh ullamcorper.</p></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '<p>Side 1</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      {
      'size' : 'w5',
      'name' : 'Training Video',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'sides' : [
        {
          'title' : 'Utility Alerts',
          'content' : '<videogular vg-theme="config.theme"><vg-video vg-src="config.sources" vg-tracks="config.tracks"></vg-video><vg-controls><vg-play-pause-button></vg-play-pause-button><vg-timedisplay>{{ currentTime | date:"mm:ss" }}</vg-timedisplay><vg-scrubBar><vg-scrubbarcurrenttime></vg-scrubbarcurrenttime></vg-scrubBar><vg-timedisplay>{{ timeLeft | date:"mm:ss" }}</vg-timedisplay><vg-volume><vg-mutebutton></vg-mutebutton><vg-volumebar></vg-volumebar></vg-volume><vg-fullscreenButton></vg-fullscreenButton></vg-controls><vg-overlay-play></vg-overlay-play><vg-poster-image vg-url="controller.config.plugins.poster"></vg-poster-image></videogular>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '<p>Side 1</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      {
      'size' : '0',
      'name' : 'Utility Alerts',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Utility Alerts',
          'content' : '<div class="utilityAlert"><p>Nunc tincidunt ornare orci, nec suscipit nisl viverra a. Praesent felis dolor, congue sed tempus a, tincidunt eu ligula. In vestibulum venenatis lacus non sodales. Praesent convallis erat eget nisl tristique pellentesque non a urna. Sed mattis ligula purus, ut accumsan arcu placerat ac. Sed sollicitudin arcu at purus ultricies ornare. Nullam efficitur sed sapien vitae tempor. Donec volutpat nunc vel neque volutpat, in iaculis nibh ullamcorper.</p></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '<p>Side 1</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
       {
      'size' : 'w3',
      'name' : 'Track Employees',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'sides' : [
        {
          'title' : 'Utility Alerts',
           'content': '<ui-gmap-google-map center="map.center" zoom="map.zoom"></ui-gmap-google-map>',
           'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Track Trucks',
          'content': 'dasdsa',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Track Shipments',
          'content': 'dsadas',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      {
      'size' : '0',
      'name' : 'Utility Alerts',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Utility Alerts',
          'content' : '<div class="utilityAlert"><p>Nunc tincidunt ornare orci, nec suscipit nisl viverra a. Praesent felis dolor, congue sed tempus a, tincidunt eu ligula. In vestibulum venenatis lacus non sodales. Praesent convallis erat eget nisl tristique pellentesque non a urna. Sed mattis ligula purus, ut accumsan arcu placerat ac. Sed sollicitudin arcu at purus ultricies ornare. Nullam efficitur sed sapien vitae tempor. Donec volutpat nunc vel neque volutpat, in iaculis nibh ullamcorper.</p></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '<p>Side 1</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      {
      'size' : 'w5',
      'name' : 'Input',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Schedule Shift',
          'content' : '<div class="inputDate"><div class="tableHolder"><datepicker ng-model="dt" min-date="minDate" show-weeks="true" class="well well-sm"></datepicker></div><div class="dateSelected" ng-if="dt">Date Selected : <b>{{dt | date:"fullDate" }}</b></div><div class="clear"></div><md-checkbox ng-model="data.cb1" aria-label="Checkbox 1" ng-if="dt">Shift 1</md-checkbox><md-checkbox ng-model="data.cb2" aria-label="Checkbox 2" ng-if="dt">Shift 2</md-checkbox><md-checkbox ng-model="data.cb3" aria-label="Checkbox 3" ng-if="dt">Shift 3</md-checkbox><div class="clear"></div><div class="dateComment" ng-if="dt"><textarea placeholder="Additional Comments..."></textarea><div class="clear"></div><md-button class="md-raised" ng-if="dt">Submit</md-button></div><p ng-if="!dt">Please select a date to begin</p></div> ',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
       {
      'size' : 'w6',
      'name' : 'Calender',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa-suitcase', 'fa-bar-chart', 'fa-bell-o', 'fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Shift Calender',
          'content' : '<div class="calenderWrap"><h2 class="text-center">{{ calendarControl.getTitle() }}</h2><mwl-calendar calendar-events="events" calendar-view="calendarView"calendar-current-day="calendarDay" calendar-control="calendarControl" calendar-event-click="eventClicked($event)" calendar-edit-event-html="edit" calendar-delete-event-html="delete" calendar-edit-event-click="eventEdited($event)" calendar-delete-event-click="eventDeleted($event)" calendar-auto-open="true"></mwl-calendar><div class="clear"></div></div><div class="calender_nav"><md-button class="md-raised" ng-click="calendarControl.prev()">Previous</md-button ><md-button class="md-raised" ng-click="setCalendarToToday()">Today</md-button ><md-button class="md-raised" ng-click="calendarControl.next()">Next</md-button ></div><div class="calender_sort"><md-radio-group ng-model="calendarView"><md-radio-button value="year" aria-label="Year">Year</md-radio-button><md-radio-button value="month" aria-label="Month"> Month </md-radio-button><md-radio-button value="week" aria-label="Week"> Week </md-radio-button><md-radio-button value="day" aria-label="Day"> Day </md-radio-button></md-radio-group></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      }
      ];


  });


