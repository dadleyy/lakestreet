ld.directive('ldTrack', ['SoundManager', 'HtmlUtils', function(SoundManager, HtmlUtils) {

  function Track() {
    this.$scope = null;
    this.element = null;
    this.album = null;
    this.sound = null;
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
    this.sound.play();
    this.album.setPlayState(true);
    SoundManager.setActiveSound(this.sound);
  };

  Track.prototype.stop = function() {
    this.sound.stop();
    this.album.setPlayState(false);
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
        $scope.is_playing = true;
        trackController.play();
      };

      $scope.onScroll = function(page_top, offset) {
      };

      $scope.stop = function() {
        $scope.is_playing = false;
        trackController.stop();
      };

      $scope.finished = function() {
        $scope.stop();
        albumController.playNext();
      };
     
      $scope.toggle = function() {
        return $scope[$scope.is_playing ? 'stop' : 'play']();
      };

      trackController.initialize($scope, element, albumController);
    }
  }

}]);
