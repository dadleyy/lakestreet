ld.directive('ldWaveform', ['Viewport', function(Viewport) {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    scope: { active: '&' },
    link: function($scope, $element, $attrs, trackController) {
      function update(sound) {
      };

      function resize() {
      };

      trackController.addListener(update);
      Viewport.addListener('resize', resize);
    }
  };

}]);
