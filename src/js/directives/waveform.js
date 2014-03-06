ld.directive('ldWaveform', [function() {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.waveform',
    require: '^ldTrack',
    scope: { active: '&' },
    link: function($scope, element, attrs, trackController) {
      function update(sound) {
      }

      console.log( $scope.active() );
      
      trackController.addListener(update);
    }
  };

}]);
