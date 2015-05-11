//'use strict';
import angular1 from 'angular';
import moki from 'angular-mocks';
 
describe('lmaController', () => {

  var sut = null;
  var scope = null;
  beforeEach(moki.module('app'));
    
  beforeEach(moki.inject(($rootScope, $controller) => {
    
    scope = $rootScope.$new();
    sut = $controller('lmaController', {$scope: scope});

  }));

  it("lmaController exists", () => {

    sut.should.not.be.null;
    
  });

});