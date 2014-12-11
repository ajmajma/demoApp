'use strict';

describe('Service: cacheCheck', function () {

  // load the service's module
  beforeEach(module('demoAppApp'));

  // instantiate service
  var cacheCheck;
  beforeEach(inject(function (_cacheCheck_) {
    cacheCheck = _cacheCheck_;
  }));

  it('should do something', function () {
    expect(!!cacheCheck).toBe(true);
  });

});
