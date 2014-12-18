'use strict';

describe('Directive: testPackery', function () {

  // load the directive's module
  beforeEach(module('demoAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<test-packery></test-packery>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the testPackery directive');
  }));
});