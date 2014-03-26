ld.directive('ldLoadSplash', ['$rootScope', 'Loop', function($rootScope, Loop) {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.load_splash',
    scope: { },
    link: function($scope, $element, $attrs) {
      var loop_id = null,
          svg = d3.select($element[0]).append('svg'),
          grp = svg.append('g'),
          path = grp.append('path');

      $scope.loading = false;
      $scope.hidden = false;

      var fade_to = null,
          hide_to = null,
          hide_time = 1600,
          fade_time = 1400;

      function hide() {
        $scope.hidden = true;
        Loop.remove(loop_id);
        $rootScope.$digest();
      };

      function fade() {
        $scope.loading = false;
        hide_to = setTimeout(hide, hide_time);
        $rootScope.$digest();
      };

      function update() {
        path.attr({d: 'M 10 40 L 10 -40 L 40 -40 L 40 40 Z'});
        path.attr({fill: "#f00"});
      };

      function routeStart() {
        $scope.loading = true;
        $scope.hidden = false;

        loop_id = Loop.add(update);

        if(fade_to)
          clearTimeout(fade_to);

        if(hide_to)
          clearTimeout(hide_to);
      };

      function routeFinish() {
        //fade_to = setTimeout(fade, fade_time);
      };

      $scope.$on('$routeChangeStart', routeStart);
      $scope.$on('$routeChangeSuccess', routeFinish);
      svg.attr({width: 50, height: 50});
      update();
    }
  }

}]);
