ld.config(['$interpolateProvider', '$locationProvider', '$httpProvider', function($interpolateProvider, $locationProvider, $httpProvider) {

  $interpolateProvider.startSymbol('<%=');
  $interpolateProvider.endSymbol('%>');

  $locationProvider.html5Mode(true);

}]);
