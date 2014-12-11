'use strict';

describe('Service: themeFactory', function () {

  // load the service's module
  beforeEach(module('demoAppApp'));

  // instantiate service
  var themeFactory;
  beforeEach(inject(function (_themeFactory_) {
    themeFactory = _themeFactory_;
  }));

  it('should do something', function () {
    expect(!!themeFactory).toBe(true);
  });

});
