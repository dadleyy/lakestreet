ld.directive('ldFooter', [function() {

  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'directives.footer',
    scope: { },
    link: function($scope, $element, $attrs) {
      $scope.is_open = false;

      $scope.toggle = function() {
        $scope.is_open = !$scope.is_open;
      };
    }
  };

}]);
