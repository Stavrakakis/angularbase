'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('winterflood.controllers'));


  it('should ....', inject(function($controller) {
    //spec body
    var myCtrl1 = $controller('Dashboard', { $scope: {} });
    expect(myCtrl1).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var myCtrl2 = $controller('Account', { $scope: {} });
    expect(myCtrl2).toBeDefined();
  }));
});
