ld.controller('HomeController', ['$scope', 'Albums', 'Events', 'Timeline', function($scope, Albums, Events, Timeline) {

  $scope.albums = Albums;
  $scope.tweets = Timeline;
  $scope.events = Events;

}]);
