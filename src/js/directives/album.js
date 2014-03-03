ld.directive('ldAlbum', [function() {

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.album',
    scope: { album: '=' },
    link: function($scope, element, attr) {
    }
  };

}]);
