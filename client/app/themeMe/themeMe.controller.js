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
      templateUrl: 'fa favoriteModal.html',
      controller: 'fa favoriteModalCtrl',
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
    title: 'fa favorites',
    icon: 'fa fa-heart',
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
    icon: 'fa fa-graduation-cap',
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
    icon: 'fa fa-truck'
  },
  {
    title: 'Insurance',
    icon: 'fa fa-umbrella'
  },
  {
    title: 'Healthcare',
    icon: 'fa fa-coffee'
  },
  {
    title: 'Manufacturing',
    icon: 'fa fa-gears'
  },
  {
    title: 'Retail',
    icon: 'fa fa-shopping-cart'
  },
  {
    title: 'Hospitality',
    icon: 'fa fa-heart'
  },
  {
    title: 'Finance',
    icon: 'fa fa-line-chart'
  },
  {
    title: 'Banking',
    icon: 'fa fa-money'
  }

];
//Object for Global Nav
    $scope.categoriesForMarket = [
    { 
    title: 'Education',
    icon: 'fa fa-graduation-cap',
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
    icon: 'fa fa-truck'
  },
  {
    title: 'Insurance',
    icon: 'fa fa-umbrella'
  },
  {
    title: 'Healthcare',
    icon: 'fa fa-coffee'
  },
  {
    title: 'Manufacturing',
    icon: 'fa fa-gears'
  },
  {
    title: 'Retail',
    icon: 'fa fa-shopping-cart'
  },
  {
    title: 'Hospitality',
    icon: 'fa fa-heart'
  },
  {
    title: 'Finance',
    icon: 'fa fa-line-chart'
  },
  {
    title: 'Banking',
    icon: 'fa fa-money'
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
      'size' : 'w3',
      'name' : 'Statistics',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
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
      'size' : '',
      'name' : 'Graph Two',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Graph Two',
          'content' : '<div class="graph_two" ></div>',
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
      'size' : 'w5',
      'name' : 'Graph Three',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Graph',
          'content' : '<div class="graph_three" ></div>',
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
      'name' : 'Track Employees',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
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
      'size' : 'w5',
      'name' : 'Graph Three',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Graph',
          'content' : '<div class="graph_four" ></div>',
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
      'size' : 'w5',
      'name' : 'Training Video',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'sides' : [
        {
          'title' : 'Training Video',
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
      'size' : 'w3',
      'name' : 'Statistics',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
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
           "key": "Series 3",
          "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
      },
      {
          "key": "Series 4",
          "values": [ [ 1025409600000 , -7.0674410638835] , [ 1028088000000 , -14.663359292964] , [ 1030766400000 , -14.104393060540] , [ 1033358400000 , -23.114477037218] , [ 1036040400000 , -16.774256687841] , [ 1038632400000 , -11.902028464000] , [ 1041310800000 , -16.883038668422] , [ 1043989200000 , -19.104223676831] , [ 1046408400000 , -20.420523282736] , [ 1049086800000 , -19.660555051587] , [ 1051675200000 , -13.106911231646] , [ 1054353600000 , -8.2448460302143] , [ 1056945600000 , -7.0313058730976] ]
      }
   ];

   $scope.exampleMultiBar = [
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
   $scope.user = {'title' : 'Dr', 'email' : 'user@user.com', 'company' : 'Volute', 'firstName' : 'Joe', 'lastName' : 'Nameson', 'address' : '640 George Hwy', 'city' : 'Lincoln', 'state' : 'RI', 'postalCode' : '02906', 'country' : 'USA' ,'dob' : '01/02/1954', 'diagnosis' : 'ACL Tear', 'statusDate' : '12/15/2014', 'pharmacy' : 'CVS#8671', 'procedure' : 'Knee Surgery','procedureDate' : '10/3/2014','procStatus' : 'Performed', 'cpt': '29881', 'symptoms' : 'Knee Pain' }; 


  });


