ld.directive('ldLoadSplash', ['$rootScope', function($rootScope) {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.load_splash',
    link: function($scope, $element, $attrs) {
      $scope.loading = false;
      $scope.hidden = false;

      var fade_to = null,
          hide_to = null,
          hide_time = 1600,
          fade_time = 1400;

      function hide() {
        $scope.hidden = true;
        $rootScope.$digest();
      }

      function fade() {
        $scope.loading = false;
        $rootScope.$digest();
        hide_to = setTimeout(hide, hide_time);
      }

      function routeStart() {
        $scope.loading = true;
        $scope.hidden = false;

        if(fade_to)
          clearTimeout(fade_to);

        if(hide_to)
          clearTimeout(hide_to);
      }

      function routeFinish() {
        fade_to = setTimeout(fade, fade_time);
      }

      $scope.$on('$routeChangeStart', routeStart);
      $scope.$on('$routeChangeSuccess', routeFinish);
    }
  }

}]);
