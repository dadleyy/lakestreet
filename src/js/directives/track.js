ld.directive('ldTrack', ['SoundManager', function(SoundManager) {

  var is_fn = angular.isFunction;

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.track',
    scope: { track: '=' },
    controller: ['$scope', function($scope) {
      $scope.play_listeners = [];

      this.addListener = function(fn) {
        if(is_fn(fn))
          $scope.play_listeners.push(fn);
      }
    }],
    link: function($scope, element, attrs, controller) {
      var sound = null;
      $scope.is_playing = false;

      function stopCallback() {
        $scope.is_playing = false;
        sound.destruct();
        try {
          $scope.$digest();
        }catch(e) { }
      }

      function playCallback() {
        for(var i = 0; i < $scope.play_listeners.length; i++) {
          $scope.play_listeners[i](sound);
        }
      }

      $scope.play = function() {
        sound = SoundManager.createSound({
          url: $scope.track.streaming_url,
          onstop: stopCallback,
          whileplaying: playCallback,
          useWaveformData: true
        });

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
