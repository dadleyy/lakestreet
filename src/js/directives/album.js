ld.directive('ldAlbum', ['Viewport', 'CanvasUtils', function(Viewport, CanvasUtils) {

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

    var image = new Image(),
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        image_url = this.$scope.album.large_art_url,
        cors_url = image_url.replace(/http:\/\/(.*)/i, "http://www.corsproxy.com/$1"),
        container = this.$element;
    
    function draw() {
      var w = container.width(),
          h = container.height(),
          image_data, pixel_data,
          final_data = [];

      canvas.width = w;
      canvas.height = h;

      console.log(cors_url);
      context.drawImage(image, 0, 0, w, h);

      image_data = context.getImageData(0, 0, w, h);
      pixel_data = image_data.data;

      CanvasUtils.blur(100, pixel_data, w, h);
      
      context.putImageData(image_data, 0, 0);
    };

    image.crossOrigin = "anonymous";
    image.onload = draw;
    image.src = cors_url;

    container.append(canvas);
    //Viewport.addListener('resize', draw);
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
      albumController.initialize($element);

      $scope.onScroll = function(page_top, bounding_box) {
        return albumController.onScroll(page_top, bounding_box);
      };
    }
  };

}]);
