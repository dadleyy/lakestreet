ld.directive('ldTwitterFeed', [function() {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.twitter_feed',
    scope: { tweets: '=' },
    link: function($scope, $element, $attrs) {
      $scope.expanded = false;
      $scope.expand = function() { 
        $scope.expanded = !$scope.expanded;
      };
    }
  };

}]);
