ld.directive('ldAlbum', [function(Viewport, CanvasUtils) {

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
    return this.$element.offset().top;
  };

  Album.prototype.playNext = function() {
    console.log('playing next');
  };

  Album.prototype.onScroll = function(page_top) {
    var ele_top = this.$element.offset().top,
        half_window = 0.5 * window.innerHeight,
        ele_dist = ele_top - (page_top + half_window),
        opacity = 1 - (ele_dist * 0.0025);

    if(opacity < 0)
      opacity = 0;

    if(opacity > 1)
      opacity = 1;

    this.$element.css({
      opacity: opacity
    });
  };

  Album.$inject = ['$scope'];

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.album',
    scope: { album: '=' },
    controller: Album,
    link: function($scope, $element, attr, albumController) { 
      albumController.initialize($element);

      function onScroll(evt, page_top) {
        return albumController.onScroll(page_top);
      };

      $scope.$on('homescroll', onScroll);
    }
  };

}]);
