'use strict';

describe('Directive: packeryAngular', function () {

  // load the directive's module
  beforeEach(module('demoAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<packery-angular></packery-angular>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the packeryAngular directive');
  }));
});