ld.config(['$interpolateProvider', function($interpolateProvider) {

  $interpolateProvider.startSymbol('<%=');
  $interpolateProvider.endSymbol('%>');

}]);
