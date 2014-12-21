'use strict';

describe('Controller: PublishModalCtrl', function () {

  // load the controller's module
  beforeEach(module('demoAppApp'));

  var PublishModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublishModalCtrl = $controller('PublishModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
