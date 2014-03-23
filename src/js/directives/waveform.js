ld.directive('ldWaveform', ['Viewport', 'Loop', function(Viewport, Loop) {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    scope: { active: '&' },
    link: function($scope, $element, $attrs, trackController) {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');

      function update(sound) {
        console.log(sound.waveformData);
      };

      function resize() {
        var width = $element.width(),
            height = $element.height();
        
        canvas.width = width;
        canvas.height = height;
      };

      $element.append(canvas);
      trackController.addListener(update);
      Viewport.addListener('resize', resize);
    }
  };

}]);
