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
          path = grp.append('path'),
          fade_to = null,
          hide_to = null,
          hide_time = 1600,
          fade_time = 1400,
          inner_radius = 12;

      $scope.loading = false;
      $scope.hidden = false;

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

      function radiusMod(dt) {
        var time = new Date().getTime() * 0.01,
            plus = Math.sin(time % (Math.PI * 2));

        return plus * 5;
      };

      function update(dt) {
        var inc = (Math.PI * 2) * 0.25,
            center = 25,
            outer_radius = 15 + radiusMod(dt),
            p = "";

        for(var i = 0; i < 4; i++) {
          var c_rads = i * inc,
              c_xpos = (Math.cos(c_rads) * outer_radius) + center,
              c_ypos = (Math.sin(c_rads) * outer_radius) + center,
              c_coords = [Math.ceil(c_xpos), Math.ceil(c_ypos)].join(' ');
              // the point position
              p_rads = (i + 0.5) * inc,
              p_xpos = (Math.cos(p_rads) * inner_radius) + center,
              p_ypos = (Math.sin(p_rads) * inner_radius) + center,
              p_coords = [Math.ceil(p_xpos), Math.ceil(p_ypos)].join(' ');

          if(i === 4 -1)
            p = ["M", p_coords, p].join(' ');

          var c = ["Q", c_coords, p_coords].join(' ');
          p = [p, c].join(' ');
        };

        p += "Z";

        path.attr({d: p});
        path.attr({fill: "rgba(255,255,255,1.0)"});
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
