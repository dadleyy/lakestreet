ld.directive('ldTrack', ['SoundManager', 'CAK', 'Viewport', 'Loop', function(SoundManager, CAK, Viewport, Loop) {

  function Track($scope) {
    this.$scope = $scope;
    this.$element = null;
    this.album = null;
    this.sound = null;
    this.is_stopping = false;
    this.callbacks = [];

    var self = this,
        stream_url = this.$scope.track.streaming_url;

    function stop() { 
      self.$scope.stop() 
    };

    function finished() {
      self.$scope.finished();
    };

    this.sound = SoundManager.createSound({
      url: [stream_url, CAK].join('&api_key='),
      onstop: stop,
      onfinish: finished
    });
  };

  Track.prototype.initialize = function($element, album) {
    this.$element = $element;
    this.album = album;
  };

  Track.prototype.addListener = function(fn) {
    if(angular.isFunction(fn))
      this.callbacks.push(fn);
  };

  Track.prototype.update = function() {
    for(var i = 0; i < this.callbacks.length; i++)
      this.callbacks[i](this.sound);
  };

  Track.prototype.play = function() {
    SoundManager.setActiveSound(this.sound);
    this.sound.play();

    this.loop_id = Loop.add(this.$scope.playing);

    this.album.setPlayState(true);
  };

  Track.prototype.stop = function() {
    this.is_stopping = true;
    this.sound.stop();
    this.album.setPlayState(false);
    this.is_stopping = false;
    Loop.remove(this.loop_id);
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
        $scope.is_playing = true;
        trackController.play();
      };

      $scope.stop = function() {
        console.log('stopping: ' + $scope.track.title);
        // flag the track as not playing
        $scope.is_playing = false;

        // if we're not in a stop callback
        if(trackController.is_stopping)
          return false;

        // run the controller's stop
        trackController.stop();
      };

      $scope.finished = function() {
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
