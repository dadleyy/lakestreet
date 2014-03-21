ld.directive('ldTrack', ['SoundManager', 'CAK', function(SoundManager, CAK) {

  function Track($scope) {
    this.$scope = $scope;
    this.element = null;
    this.album = null;
    this.sound = null;
    this.is_stopping = false;
  };

  Track.prototype.initialize = function(element, album) {
    this.element = element;
    this.album = album;

    var stream_url = this.$scope.track.streaming_url,
        stop = this.$scope.stop,
        finished = this.$scope.finished;

    this.sound = SoundManager.createSound({
      url: [stream_url, CAK].join('&api_key='),
      onstop: stop,
      onfinish: finished 
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
        $scope.is_playing = false;

        if(trackController.is_stopping)
          return false;

        trackController.stop();
      };

      $scope.finished = function() {
      };
     
      $scope.toggle = function() {
        return $scope[$scope.is_playing ? 'stop' : 'play']();
      };

      function onScroll(evt, page_top) {
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

      $scope.$on('homescroll', onScroll);

      trackController.initialize($element, albumController);
    }
  }

}]);
