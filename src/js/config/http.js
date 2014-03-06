ld.config(['$httpProvider', function($httpProvider) {

  $httpProvider.interceptors.push('XhrMonitor');

}]);
