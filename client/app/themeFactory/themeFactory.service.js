'use strict';

angular.module('demoAppApp')
  .factory('themeFactory', function ($rootScope) {
    // Service logic
      var x = "no";
      var y = "no";
      return {
      setModal: function (modal) {
        x = modal;
        //broadcast event if not "no", your logic from $watch
        $rootScope.$broadcast(this.modalOpened, modal);
      },
      getModal: function(){
          return x;
      },
      //Defining an event name to broadcast
      modalOpened: "themeFactory.modalOpened",

      setAlert: function (alert) {
        y = alert;
        //broadcast event if not "no", your logic from $watch
        $rootScope.$broadcast(this.alertOpened, alert);
      },
      getAlert: function(){
          return y;
      },
      //Defining an event name to broadcast
      alertOpened: "themeFactory.alertOpened"
  };
});
