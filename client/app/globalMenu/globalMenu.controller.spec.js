'use strict';

describe('Controller: GlobalMenuCtrl', function () {

  // load the controller's module
  beforeEach(module('demoAppApp'));

  var GlobalMenuCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GlobalMenuCtrl = $controller('GlobalMenuCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
