ld.directive('ldWaveform', [function() {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    link: function($scope, element, attrs, trackController) {
      function updateWave(sound) {
        console.log(sound.waveformData);
      }
      trackController.addListener(updateWave);
    }
  };

}]);
