ld.config(['$routeProvider', function($routeProvider) {

  $routeProvider.otherwise({
    redirectTo: '/home'
  });

}]);
