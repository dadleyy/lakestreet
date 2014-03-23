ld.directive('ldNav', [function() {

  return {
    restrict: 'EA',
    scope: { },
    replace: true,
    templateUrl: 'directives.nav',
    link: function($scope, $element, $attrs) {
      $scope.navigate = function(dest) {
        $scope.$emit('navigate', dest);
      };
    }
  };

}]);
