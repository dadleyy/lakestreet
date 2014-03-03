ld.directive('ldWaveform', [function() {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    link: function($scope, element, attrs, trackController) {
      function update(sound) {
        console.log(sound);
      }
      

      trackController.addListener(update);
    }
  };

}]);
