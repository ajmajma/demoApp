'use strict';

describe('Controller: ThemeMeCtrl', function () {

  // load the controller's module
  beforeEach(module('demoAppApp'));

  var ThemeMeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThemeMeCtrl = $controller('ThemeMeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
