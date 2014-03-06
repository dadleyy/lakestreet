ld.directive('ldAlbum', [function() {

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.album',
    scope: { album: '=' },
    controller: ['$scope', function($scope) {

      this.setPlayState = function(state) {
        $scope.playing = state;
      };

    }],
    link: function($scope, element, attr) { 
      $scope.playing = false;  

      $scope.albumFade = function(page_top, bounding_box) {
        var window_mid = (window.innerHeight * 0.5) + page_top,
            distance = window_mid - bounding_box.top,
            opacity;

        if(distance > 0) 
          distance = 0;

        opacity = 1 + (distance * 0.025);
        element.css({opacity: opacity});
      };
    }
  };

}]);
