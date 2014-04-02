ld.directive('ldFooter', ['MenuManager', function(MenuManager) {

  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'directives.footer',
    scope: { },
    link: function($scope, $element, $attrs) {
      var menu_id = null;
      $scope.is_open = false;

      $scope.close = function() {
        $scope.is_open = false;
      };

      $scope.toggle = function(evt) {
        $scope.is_open = !$scope.is_open;

        if($scope.is_open)
          menu_id = MenuManager.add($scope.close);
        else
          MenuManager.remove(menu_id);

        evt.stopPropagation();
      };
    }
  };

}]);
