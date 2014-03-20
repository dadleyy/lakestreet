describe('the module', function() {
  
  beforeEach(module('lakestreet'));

  var $location, $rootScope, $route, $httpBackend, album_ids;

  var prep = ['$location', '$rootScope', '$route', '$httpBackend', 'ALBUM_IDS', function() {
    $location = arguments[0];
    $rootScope = arguments[1];
    $route = arguments[2];
    $httpBackend = arguments[3];
    album_ids = arguments[4];
  }];

  beforeEach(inject(prep));

  beforeEach(function() {
    for(var i = 0; i < album_ids.length; i++ ) {
      $httpBackend.expectGET(/api\/camp.*/).respond(200, {});
    }
    $httpBackend.expectGET(/api\/town.*/).respond(200, []);
    $httpBackend.expectGET(/api\/twit.*/).respond(200, []);

    $location.path('/home');
    $rootScope.$digest();

    $httpBackend.flush();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should exist', function() {
    expect($location.path()).toBe('/home');
    expect($route.current.templateUrl).toBe('views.home');
  });

});
