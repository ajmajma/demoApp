'use strict';

describe('Controller: MarketModalCtrl', function () {

  // load the controller's module
  beforeEach(module('demoAppApp'));

  var MarketModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketModalCtrl = $controller('MarketModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
