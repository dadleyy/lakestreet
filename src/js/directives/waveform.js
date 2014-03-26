ld.directive('ldWaveform', ['Viewport', 'Loop', '$filter', function(Viewport, Loop, $filter) {

  var point_count = 256;

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    scope: { active: '&' },
    link: function($scope, $element, $attrs, trackController) {
      var canvas = document.createElement('div'),
          context = d3.select(canvas).append('svg'),
          path = context.append('path'),
          width = $element.width(),
          height = 200,
          points = [];

      function update(sound) {
        var deg_inc = (Math.PI * 2) / point_count,
            hw = width * 0.5,
            hh = height * 0.5,
            radius = hh - 10,
            time = new Date().getTime() * 0.005;
        
        radius += Math.sin(time % (Math.PI * 2)) * 10;

        for(var i = 0; i < point_count; i++) {
          var point = points[i],
              radians = deg_inc * i,
              x_pos = hw + (Math.cos(radians) * radius),
              y_pos = hh + (Math.sin(radians) * radius);

          point.x = x_pos;
          point.y = y_pos;
        }

        draw();
      };

      function moveTo(point) {
        return ["M", point.x, point.y].join(' ');
      };

      function lineTo(point) {
        return ["L", point.x, point.y].join(' ');
      };

      function draw() {
        var p = "";
        
        for(var i = 0; i < point_count; i++) {
          if(i === 0)
            p += moveTo(points[i]);
          
          p += lineTo(points[i]);

          if(i === point_count -1)
            p += "Z";
        }

        path.attr('d', p).attr("fill", "#f0f0f0");
      };

      function resize() {
        width = $element.width();
        height = $element.height();

        context.attr({
          width: width,
          height: height
        });

        update();
      };

      for(var i = 0; i < point_count + 1; i++) {
        points.push({x: i, y: i});
      }
    
      context.attr({width: width, height: height});
      $element.append(canvas);
      trackController.addListener(update);
      Viewport.addListener('resize', resize);
    }
  };

}]);
