ld.directive('ldLoadSplash', ['$rootScope', 'Loop', function($rootScope, Loop) {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.load_splash',
    scope: { },
    link: function($scope, $element, $attrs) {
      var loop_id = null,
          svg = d3.select($element.find('.orb').get(0)).append('svg'),
          grp = svg.append('g'),
          path = grp.append('path'),
          fade_to = null,
          hide_to = null,
          hide_time = 1600,
          fade_time = 1400,
          inner_radius = 10,
          o_radius = 15,
          vert_count = 5,
          orb_height = 100,
          orb_width = 100,
          rotation = 0,
          rotation_velocity = Math.PI / 10,
          rad_indx = 0,
          rad_velocity = rotation_velocity * 10;

      $scope.loading = false;
      $scope.hidden = false;
      $scope.failed = false;

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
        var plus = Math.sin(rad_indx);
        
        rad_indx += rad_velocity * (dt || 0.01);

        if(rad_indx > Math.PI * 2)
          rad_indx = 0;

        return plus * 10;
      };

      function getColor(time) {
        return parseInt(Math.sin(time) * 25 + 180, 10);
      };

      function colorFlux(dt) {
        var time = new Date().getTime() * 0.001,
            red = $scope.failed ? 200 : getColor(time),
            green = $scope.failed ? 80 : getColor(time + 2),
            blue = $scope.failed ? 80 : getColor(time + 4),
            rgba = ['rgba(', [red, green, blue, 1].join(','), ')'].join('');

        return rgba;
      };

      function update(dt) {
        var inc = (Math.PI * 2) / vert_count,
            center = orb_width * 0.5,
            outer_radius = o_radius + radiusMod(dt),
            p = "";

        if(outer_radius < o_radius)
          outer_radius = o_radius;

        for(var i = 0; i < vert_count; i++) {
          var c_rads = (i * inc) + rotation,
              c_xpos = (Math.cos(c_rads) * outer_radius) + center,
              c_ypos = (Math.sin(c_rads) * outer_radius) + center,
              c_coords = [Math.ceil(c_xpos), Math.ceil(c_ypos)].join(' ');
              // the point position
              p_rads = ((i + 0.5) * inc) + rotation,
              p_xpos = (Math.cos(p_rads) * inner_radius) + center,
              p_ypos = (Math.sin(p_rads) * inner_radius) + center,
              p_coords = [Math.ceil(p_xpos), Math.ceil(p_ypos)].join(' ');

          if(i === vert_count -1)
            p = ["M", p_coords, p].join(' ');

          var c = ["Q", c_coords, p_coords].join(' ');
          p = [p, c].join(' ');
        };

        p += "Z";

        rotation += rotation_velocity * (dt || 0.01);
        if(rotation > Math.PI * 2)
          rotation = 0;

        path.attr({d: p});
        path.attr({fill: colorFlux(dt)});
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
        fade_to = setTimeout(fade, fade_time);
      };

      function routeFail() {
        $scope.failed = true;
      };

      $scope.$on('$routeChangeStart', routeStart);
      $scope.$on('$routeChangeSuccess', routeFinish);
      $scope.$on('$routeChangeError', routeFail);

      // size and position the svg
      svg.attr({width: orb_height, height: orb_width}).style({
        'margin-left': (-orb_width * 0.5) + 'px'
      });

      update();
    }
  }

}]);
