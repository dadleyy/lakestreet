ld.directive('ldWaveform', ['Viewport', 'Loop', function(Viewport, Loop) {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    scope: { active: '&' },
    link: function($scope, $element, $attrs, trackController) {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          width, height,
          points = [];

      function update(sound) {
        var hw = width * 0.5,
            hh = height * 0.5,
            inc = 360 / points.length,
            time = sound && sound.position ? sound.position : 0;

        for(var i = 0; i < points.length; i++) {
          var deg = inc * i,
              rad = height * 0.2,
              trad = 0,
              y = hh + (Math.sin(deg) * (rad + trad)),
              x = hw + (Math.cos(deg) * (rad + trad)); 
          
          points[i].x = x;
          points[i].y = y;
        };

        draw();
      };

      function draw() {
        context.clearRect(0,0, width, height);

        context.fillStyle = "#fdfdfd"
        context.beginPath();

        for(var i = 0; i < points.length; i++) {
          var x = points[i].x,
              y = points[i].y;

          if(i === 0)
            context.moveTo(x, y);
          else
            context.lineTo(x, y);

          if(i === points.length - 1)
            context.lineTo(points[0].x, points[0].y);
        }

        context.fill();
      };

      function resize() {
        width = $element.width(),
        height = $element.height();
        
        canvas.width = width;
        canvas.height = height;

        update();
      };

      for(var i = 0; i < 256; i++) {
        points.push({x: i, y: i});
      }
    
      $element.append(canvas);
      trackController.addListener(update);
      Viewport.addListener('resize', resize);
    }
  };

}]);
