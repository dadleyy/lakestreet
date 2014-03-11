ld.directive('ldTrack', ['SoundManager', 'HtmlUtils', function(SoundManager, HtmlUtils) {

  function Track() {
    this.$scope = null;
    this.element = null;
    this.album = null;
    this.sound = null;
    this.is_stopping = false;
  };

  Track.prototype.initialize = function($scope, element, album) {
    this.$scope = $scope;
    this.element = element;
    this.album = album;

    this.sound = SoundManager.createSound({
      url: $scope.track.streaming_url,
      onstop: $scope.stop,
      onfinish: $scope.finished
    });
  };

  Track.prototype.addListener = function() {
  };

  Track.prototype.play = function() {
    SoundManager.setActiveSound(this.sound);
    this.sound.play();
    this.album.setPlayState(true);
  };

  Track.prototype.stop = function() {
    this.is_stopping = true;
    this.sound.stop();
    this.album.setPlayState(false);
    this.is_stopping = false;
  };

  Track.$inject = ['$scope'];

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.track',
    require: ['^ldAlbum', 'ldTrack'],
    scope: { track: '=' },
    controller: Track,
    link: function($scope, element, attrs, controllers) {
      var sound = null,
          trackController = controllers[1],
          albumController = controllers[0];

      $scope.is_playing = false;
      $scope.dist = 0;

      $scope.play = function() {
        console.log('playing!');
        $scope.is_playing = true;
        trackController.play();
      };

      $scope.onScroll = function(page_top, offset) {
      };

      $scope.stop = function() {
        $scope.is_playing = false;

        if(trackController.is_stopping)
          return false;

        trackController.stop();
      };

      $scope.finished = function() {
      };
     
      $scope.toggle = function() {
        console.log('playing: ' + $scope.is_playing);
        return $scope[$scope.is_playing ? 'stop' : 'play']();
      };

      trackController.initialize($scope, element, albumController);
    }
  }

}]);
