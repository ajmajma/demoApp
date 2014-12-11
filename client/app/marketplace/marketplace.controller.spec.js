'use strict';

describe('Controller: MarketplaceCtrl', function () {

  // load the controller's module
  beforeEach(module('demoAppApp'));

  var MarketplaceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketplaceCtrl = $controller('MarketplaceCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
