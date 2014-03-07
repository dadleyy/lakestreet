ld.directive('ldTrack', ['SoundManager', 'HtmlUtils', function(SoundManager, HtmlUtils) {

  var is_fn = angular.isFunction;

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.track',
    require: ['^ldAlbum', 'ldTrack'],
    scope: { track: '=' },
    controller: ['$scope', function($scope) {
      $scope.play_listeners = [];

      this.addListener = function(fn) {
        if(is_fn(fn))
          $scope.play_listeners.push(fn);
      }
    }],
    link: function($scope, element, attrs, controllers) {
      var sound = null,
          trackController = controllers[1],
          albumController = controllers[0];

      $scope.is_playing = false;
      $scope.dist = 0;

      function stopCallback() {
        $scope.is_playing = false;
        sound.destruct();
        albumController.setPlayState(false);
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
        albumController.setPlayState(true);
      }

      $scope.watchMid = function() {
      };

      $scope.stop = function() {
        $scope.is_playing = false;
        sound.stop();
      }
     
      $scope.toggle = function() {
        return $scope[$scope.is_playing ? 'stop' : 'play']();
      }

    }
  }

}]);
