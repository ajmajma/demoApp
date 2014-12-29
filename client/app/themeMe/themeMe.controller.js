'use strict';

angular.module('demoAppApp')
  .controller('ThemeMeCtrl', function ($scope, themeFactory, $rootScope, $location, Auth, socket, $http, $modal, $log, $filter) {
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

   $scope.nativeWidg = function(index){
      
      $scope.prepForSend = $scope.contentHereCurrent[index];
      themeFactory.setModal($scope.prepForSend);

    };

      $scope.data = {};
      $scope.data.cb1 = false;
      $scope.data.cb2 = false;
      $scope.data.cb3 = false;


    //add event to calender
    $scope.addShift  = function(item){


    var yearIs = parseInt($filter('date')(item, 'yyyy'));
    var monthIs = parseInt($filter('date')(item, 'M')) - 1;
    var dayIs = parseInt($filter('date')(item, 'd'));

    if($scope.data.cb1 == true){

      var shiftItem =  {};
      shiftItem = {
        title: 'Shift 1',
        type: 'warning',
        starts_at: new Date(yearIs,monthIs,dayIs,8,30),
        ends_at: new Date(yearIs,monthIs,dayIs,9,30)
      };

      $scope.events.push(shiftItem);
    }
    if($scope.data.cb2 == true){
      
      var shiftItem2 =  {};
      shiftItem2 = {
        title: 'Shift 2',
        type: 'info',
        starts_at: new Date(yearIs,monthIs,dayIs,9,30),
        ends_at: new Date(yearIs,monthIs,dayIs,10,30)
      };

      $scope.events.push(shiftItem2);
    }

     if($scope.data.cb3 == true){
      
      var shiftItem3 = {};
      shiftItem3 = {
        title: 'Shift 3',
        type: 'important',
        starts_at: new Date(yearIs,monthIs,dayIs,9,30),
        ends_at: new Date(yearIs,monthIs,dayIs,10,30)
      };

      $scope.events.push(shiftItem3);
    }

    

    };
    var currentYear = moment().year();
    var currentMonth = moment().month();

    $scope.events = [
      {
        title: 'Shift 1',
        type: 'warning',
        starts_at: new Date(currentYear,currentMonth,25,8,30),
        ends_at: new Date(currentYear,currentMonth,25,9,30)
      },
      {
        title: 'Shift 2',
        type: 'info',
        starts_at: new Date(currentYear,currentMonth,19,7,30),
        ends_at: new Date(currentYear,currentMonth,25,9,30)
      },
      {
        title: 'Shift 3',
        type: 'important',
        starts_at: new Date(currentYear,currentMonth,25,6,30),
        ends_at: new Date(currentYear,currentMonth,25,6,60)
      }
    ];

    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();

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
          'content' : '<div class="inputDate"><div class="tableHolder"><datepicker ng-model="dt" min-date="minDate" show-weeks="true" class="well well-sm"></datepicker></div><div class="dateSelected" ng-if="dt">Date Selected : <b>{{dt | date:"fullDate" }}</b></div><div class="clear"></div><md-checkbox ng-model="data.cb1" aria-label="Checkbox 1" ng-show="dt">Shift 1</md-checkbox><md-checkbox ng-model="data.cb2" aria-label="Checkbox 2" ng-show="dt">Shift 2</md-checkbox><md-checkbox ng-model="data.cb3" aria-label="Checkbox 3" ng-show="dt" >Shift 3</md-checkbox><div class="clear"></div><div class="dateComment" ng-show="dt"><textarea placeholder="Additional Comments..."></textarea><div class="clear"></div><md-button class="md-raised" ng-if="dt" ng-click="addShift(dt)">Submit</md-button></div><p ng-if="!dt">Please select a date to begin</p></div> ',
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
      },
      {
      'size' : 'w2',
      'name' : 'Shift Points',
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
          'title' : 'Shift Points',
          'content' : '<div class="shift_point_system"><div class="shift_point_top"><h5>19</h5></div><div class="shift_point_mid"><md-list layout="column"><md-item ng-repeat="message in compareWho"><md-item-content><div class="md-tile-left"><img ng-src="{{message.face}}" class="face" alt="{{message.who}}" style="border-radius: 50%;"></div><div class="md-tile-content"><h3>{{message.what}}</h3><h4>{{message.who}}</h4>{{message.notes}}</div></md-item-content> </md-item> </md-list>You are 14th out of 22.</div></div>',
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
          'content' : '<p>Points can be used for -</p>',
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
          'content' : '<nvd3-multi-bar-horizontal-chart data="examplePie" id="showControlsExample" responsive="true"  height="250" xAxisTickFormat="xAxisTickFormatFunction()" yAxisTickFormat="yAxisTickFormatFunction()" color="colorFunction()"showControls="true"showLegend="true"><svg></svg></nvd3-multi-bar-horizontal-chart>',
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
      }
      ];

    $scope.compareWho = [
      {
        face : '/assets/images/headSmall.jpg',
        what: '22 Points',
        who: 'Susan Thompson',
        when: '3:08PM',
        notes: "12th"
      },
      {
        face : '/assets/images/headSmall.jpg',
        what: '20 Points',
        who: 'Susan Thompson',
        when: '3:08PM',
        notes: "13th"
      },
      {
        face : '/assets/images/headSmall.jpg',
        what: '19 Points',
        who: 'You',
        when: '3:08PM',
        notes: "14th"
      },
      {
        face : '/assets/images/headSmall.jpg',
        what: '16 Points',
        who: 'Susan Thompson',
        when: '3:08PM',
        notes: "15th"
      }];

      var colorArray = [ '#ea6060','#28282e', '#777777'];
$scope.colorFunction = function() {
  return function(d, i) {
    return colorArray[i];
  };
}

$scope.examplePie = [
                {
                     "key": "Series 1",
                    "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
                 },
                {
                    "key": "Series 2",
                    "values": [ [ 1025409600000 , 0] , [ 1028088000000 , 0] , [ 1030766400000 , 0] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 0] , [ 1051675200000 , 0] , [ 1054353600000 , 0] , [ 1056945600000 , 0] , [ 1059624000000 , 0] , [ 1062302400000 , 0] , [ 1064894400000 , 0] , [ 1067576400000 , 0] , [ 1070168400000 , 0] , [ 1072846800000 , 0] , [ 1075525200000 , -0.049184266875945] ]
                },
                 {
                     "key": "Series 3",
                    "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
                },
                {
                    "key": "Series 4",
                    "values": [ [ 1025409600000 , -7.0674410638835] , [ 1028088000000 , -14.663359292964] , [ 1030766400000 , -14.104393060540] , [ 1033358400000 , -23.114477037218] , [ 1036040400000 , -16.774256687841] , [ 1038632400000 , -11.902028464000] , [ 1041310800000 , -16.883038668422] , [ 1043989200000 , -19.104223676831] , [ 1046408400000 , -20.420523282736] , [ 1049086800000 , -19.660555051587] , [ 1051675200000 , -13.106911231646] , [ 1054353600000 , -8.2448460302143] , [ 1056945600000 , -7.0313058730976] ]
                }
             ];


  });


