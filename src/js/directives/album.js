ld.directive('ldAlbum', [function() {

  function Album() {
    this.$scope = null;
    this.$element = null;
    this.fade_damp = 0.009;
    this.active_index = 0;
  };

  Album.prototype.setPlayState = function(state) {
    this.$scope.playing = state;
  };

  Album.prototype.initialize = function($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
  };

  Album.prototype.playNext = function() {
    console.log('playing next');
  };

  Album.prototype.onScroll = function(page_top, bounding_box) {
    var page_mid = page_top + window.innerHeight,
        bottom_buffer = 120;

    if(bounding_box.bottom + bottom_buffer < page_mid) {
      this.$element.addClass('passed-mid');
    } else {
      this.$element.removeClass('passed-mid');
    }
  };

  Album.$inject = ['$scope'];

  return {
    replace: true,
    restrict: 'EA',
    templateUrl: 'directives.album',
    scope: { album: '=' },
    controller: Album,
    link: function($scope, $element, attr, albumController) { 
      albumController.initialize($scope, $element);
      $scope.onScroll = function(page_top, bounding_box) {
        return albumController.onScroll(page_top, bounding_box);
      };
    }
  };

}]);
