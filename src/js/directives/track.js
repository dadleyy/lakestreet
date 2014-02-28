ld.directive('ldTrack', ['SoundManager', function(SoundManager) {

     return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.track',
    scope: { track: '=' },
    link: function($scope, element, attrs) {
      $scope.is_playing = false;

      function stopCallback() {
        $scope.is_playing = false;
        try {
          $scope.$digest();
        }catch(e) { }
      }

      var sound = SoundManager.createSound({
        url: $scope.track.streaming_url,
        onstop: stopCallback
      });

      $scope.play = function() {
        $scope.is_playing = true;
        SoundManager.setActiveSound(sound);
        sound.play();
      }

      $scope.stop = function() {
        $scope.is_playing = false;
        sound.stop();
      }
    }
  }

}]);
