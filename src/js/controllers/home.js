ld.controller('HomeController', ['$scope', 'Albums', 'Events', function($scope, Albums, Events) {

  $scope.albums = Albums;

  console.log(Events);

}]);
