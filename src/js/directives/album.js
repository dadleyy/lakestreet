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
    }
  };

}]);
