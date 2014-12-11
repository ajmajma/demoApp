'use strict';

describe('Controller: OfflineCtrl', function () {

  // load the controller's module
  beforeEach(module('demoAppApp'));

  var OfflineCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OfflineCtrl = $controller('OfflineCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
