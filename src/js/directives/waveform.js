ld.directive('ldWaveform', ['Viewport', function(Viewport) {

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
      };

      function resize() {
      };

      $element.append(canvas);
      trackController.addListener(update);
    }
  };

}]);
