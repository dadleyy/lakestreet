ld.directive('ldAlbum', [function(Viewport, CanvasUtils) {

  var scroll_fade = {
    buffer: 100,
    damp: 0.005
  };

  function Album($scope) {
    this.$scope = $scope;
    this.$element = null;
    this.fade_damp = 0.009;
    this.active_index = 0;
  };

  Album.prototype.setPlayState = function(state) {
    this.$scope.playing = state;
  };

  Album.prototype.initialize = function($element) {
    this.$element = $element;
  };

  Album.prototype.getTop = function() {
    return this.$element ? this.$element.offset().top : window.innerHeight;
  };

  Album.prototype.playNext = function() {
  };

  Album.prototype.onScroll = function(page_top) {
  };

  Album.$inject = ['$scope'];

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.album',
    scope: { album: '=', index: '=' },
    controller: Album,
    link: function($scope, $element, attr, albumController) { 
      albumController.initialize($element);

      $element.css({
        'z-index': ($scope.index + 1)
      });

      function onScroll(evt, page_top) {
        return albumController.onScroll(page_top);
      };

      $scope.$on('homescroll', onScroll);
    }
  };

}]);
