ld.directive('ldTrack', ['SoundManager', 'CAK', 'Viewport', function(SoundManager, CAK, Viewport) {

  function Track($scope) {
    this.$scope = $scope;
    this.$element = null;
    this.album = null;
    this.sound = null;
    this.is_stopping = false;
    this.callbacks = [];

    var _self = this,
        stream_url = this.$scope.track.streaming_url,
        started = false;

    function stopped() { 
      $scope.is_playing = false;
      _self.album.setPlayState(false);
      // make sure the play button knows to be stopped
      $scope.$broadcast('trackStop');
      started = false;
    };

    function finished() {
    };

    function loaded() {
    };

    function update() {
      if(started)
        return false;

      started = true;
      $scope.$broadcast('trackStart');
    };

    this.sound = SoundManager.createSound({
      url: [stream_url, CAK].join('&api_key='),
      onstop: stopped,
      onfinish: finished,
      onload: loaded,
      whileplaying: update,
      volume: 0
    });
  };

  Track.prototype.initialize = function($element, album) {
    this.$element = $element;
    this.album = album;
  };

  Track.prototype.play = function() {
    // make sure the sound manager provider knows this sound is playing
    SoundManager.setActiveSound(this.sound);
    // actually start the sound
    this.sound.play();
    this.$scope.is_playing = true;
    this.$scope.$broadcast('trackPlay');
  };

  Track.prototype.stop = function() {
    this.sound.stop();
  };

  Track.prototype.getState = function() {
    return this.$scope.is_playing;
  };

  Track.$inject = ['$scope'];

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.track',
    require: ['^ldAlbum', 'ldTrack'],
    scope: { track: '=' },
    controller: Track,
    link: function($scope, $element, $attrs, $controllers) {
      var sound = null,
          trackController = $controllers[1],
          albumController = $controllers[0],
          locked = false;

      $scope.is_playing = false;
      $scope.dist = 0;

      $scope.play = function() {
        trackController.play();
      };

      $scope.stop = function() {
        trackController.stop();
      };

      $scope.playing = function() {
        trackController.update();
      };
     
      $scope.toggle = function() {
        return $scope[$scope.is_playing ? 'stop' : 'play']();
      };

      $scope.onScroll = function(page_top) {
        var ele_top = $element.offset().top,
            half_win = window.innerHeight * 0.5,
            mid = page_top + half_win + (half_win * 0.5);

        if(ele_top < mid) {
          if(!locked)
            $element.addClass('in-view');

          locked = true
        } else {
          if(locked) 
            $element.removeClass('in-view');

          locked = false;
        }
      };

      trackController.initialize($element, albumController);
    }
  }

}]);
