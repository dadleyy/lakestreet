ld.directive('ldTrack', ['SoundManager', 'HtmlUtils', function(SoundManager, HtmlUtils) {

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
      $scope.dist = 0;

      function stopCallback() {
        $scope.is_playing = false;
        sound.destruct();
        try {
          $scope.$digest();
        }catch(e) { }
      }

      function scrollListener(evt, page_top) {
        var offset = { y: 0, x: 0},
            ele_offset = HtmlUtils.getOffset(element[0], offset),
            ele_mid = offset.y + (element[0].offsetHeight * 0.5),
            window_height = window.innerHeight,
            page_mid = page_top + (window_height * 0.5),
            dist = Math.abs(page_mid - ele_mid),
            opacity = 1 - (dist * 0.01);

        if(opacity < 0)
          opacity = 0;

        element.css({opacity:opacity});

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


      $scope.$on('ldScroll', scrollListener);
    }
  }

}]);
