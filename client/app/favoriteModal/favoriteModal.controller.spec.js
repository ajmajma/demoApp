'use strict';

describe('Controller: FavoriteModalCtrl', function () {

  // load the controller's module
  beforeEach(module('demoAppApp'));

  var FavoriteModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FavoriteModalCtrl = $controller('FavoriteModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
