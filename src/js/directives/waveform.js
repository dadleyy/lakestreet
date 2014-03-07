ld.directive('ldWaveform', ['ViewportManager', function(ViewportManager) {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    scope: { active: '&' },
    link: function($scope, element, attrs, trackController) {
      function update(sound) {
      }

      function resize() {
      }

      trackController.addListener(update);
      ViewportManager.addListener(resize);
    }
  };

}]);
