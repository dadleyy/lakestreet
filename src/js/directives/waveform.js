ld.directive('ldWaveform', ['Loop', function(Loop) {

  function indexDistance(indx, target, bound, length) {
    var dist = Math.abs(target - indx),
        upper_cutoff = length - bound;

    if(target > upper_cutoff && indx < bound) {
      var mod = upper_cutoff - target;
      dist = bound - Math.abs(indx - mod);
    }

    if(target < bound && indx > upper_cutoff) {
      var mod = length + target;
      dist = Math.abs(mod - indx);
    }

    return Math.max(0, bound - dist) / bound;
  };

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    scope: { active: '&' },
    link: function($scope, $element, $attrs, trackController) {
      var svg = d3.select($element.get(0)).append('svg'),
          group = svg.append('g'),
          path = group.append('path'),
          circle = group.append('circle'),
          width = 200,
          height = 200,
          radius = (width * 0.5) - (width * 0.2),
          path_radius = radius - (radius * 0.4),
          apex_radius = path_radius + (radius * 0.25),
          addt_radius = radius * 0.25,
          vert_count = 8,
          vert_inc = (Math.PI * 2) / vert_count,
          apex = 0,
          apex_velocity = 3,
          apex_buffer = 1,
          circle_radius = radius,
          radius_velocity = Math.PI * 2,
          radius_mod = 0,
          loop_id = null;

      function update(dt) {
        circle_radius += Math.sin(radius_mod) * 5;
        draw();

        apex += apex_velocity * dt;
        if(apex > vert_count)
          apex = 0;
        
        radius_mod += radius_velocity * dt;
        circle_radius = radius;

        if(radius_mod > Math.PI * 2)
          radius_mod = 0;
      };

      function isPlaying() {
        return trackController.$scope.is_playing;
      };

      function draw() {
        var p = "",
            lower_bound = apex - apex_buffer,
            upper_bound = apex + apex_buffer;

        circle.attr({opacity: 0.0});

        for(var i = 0; i < vert_count; i++) {
          var apex_dist = isPlaying() ? indexDistance(i, apex, apex_buffer, vert_count) : 0,
              mod_radius = apex_radius + (addt_radius * apex_dist),
              // the control point coordinates
              c_rads = i * vert_inc,
              c_x = Math.cos(c_rads) * mod_radius,
              c_y = Math.sin(c_rads) * mod_radius,

              // the point coordinates
              p_rads = (i + 0.5) * vert_inc,
              p_x = Math.cos(p_rads) * path_radius,
              p_y = Math.sin(p_rads) * path_radius;
          

          p += ["Q", c_x, c_y, p_x, p_y].join(' ');

          if(vert_count - 1 === i)
            p = ["M", p_x, p_y, p].join(' ');
        }

        p += "Z";

        circle.attr({
          'r': circle_radius,
          'transform': ['rotate(', (radius_mod * 180) / Math.PI, ')'].join('')
        });
        path.attr({d: p, fill: '#fff'});
        circle.attr({"opacity": 1.0});
      };

      function start() {
        loop_id = Loop.add(update);
      };

      function stop() {
        Loop.remove(loop_id);
        apex = 0;
        circle_radius = radius;
        radius_mod = 0;
        draw();
      };

      svg.attr({width: width, height: height});
      group.attr({'transform': ['translate(', (width * 0.5), ',', (height * 0.5), ')'].join('')});
      circle.attr({'fill': 'transparent', 'stroke': '#fff', 'stroke-width': 2});

      $scope.$on('trackStart', start);
      $scope.$on('trackStop', stop);
      draw();
    }
  };

}]);
