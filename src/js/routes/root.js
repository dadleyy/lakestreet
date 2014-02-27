ld.config(['$routeProvider', function($routeProvider) {

  $routeProvider.otherwise({
    template: "views.root"
  });

}]);
