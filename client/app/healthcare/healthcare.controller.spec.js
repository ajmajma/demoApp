'use strict';

describe('Controller: HealthcareCtrl', function () {

  // load the controller's module
  beforeEach(module('demoAppApp'));

  var HealthcareCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HealthcareCtrl = $controller('HealthcareCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
