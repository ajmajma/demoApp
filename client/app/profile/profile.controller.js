'use strict';

angular.module('demoAppApp')
  .controller('ProfileCtrl', function ($scope, User, Auth, $sce, $http) {


    //change password control
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
    };

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.user = {'title' : 'Dr', 'email' : 'user@user.com', 'company' : 'Volute', 'firstName' : 'Joe', 'lastName' : 'Nameson', 'address' : '640 George Washington Hwy', 'city' : 'Lincoln', 'state' : 'RI', 'postalCode' : '02906', 'country' : 'USA' }; 
   


  });
