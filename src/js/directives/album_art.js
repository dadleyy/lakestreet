ld.directive('ldAlbumArt', ['Viewport', 'CanvasUtils', function(Viewport, CanvasUtils) {

  return {
    restrict: 'EA',
    templateUrl: 'directives.album_art',
    replace: true,
    scope: { album: '=' },
    require: '^ldAlbum',
    link: function($scope, $element, $attrs, albumController) {
      var image = new Image(),
          canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image_url = $scope.album.large_art_url,
          cors_url = image_url.replace(/http:\/\/(.*)/i, "http://www.corsproxy.com/$1"),
          container = $element;
      
      function draw() {
        var w = container.width(),
            h = container.height(),
            image_data, pixel_data,
            final_data = [];

        canvas.width = w;
        canvas.height = h;

        context.drawImage(image, 0, 0, w, h);

        image_data = context.getImageData(0, 0, w, h);
        pixel_data = image_data.data;

        CanvasUtils.grey(pixel_data);
        CanvasUtils.blur(100, pixel_data, w, h);
        
        context.putImageData(image_data, 0, 0);
      };

      function px(num) {
        return [num, 'px'].join('');
      };

      function clip(top_v, right_v, bottom_v, left_v) {
        var t = px(top_v),
            r = px(right_v),
            b = px(bottom_v),
            l = px(left_v),
            val = [t, r, b ,l].join(',');

        return ['rect(', val, ')'].join('');
      };

      function onScroll(evt, page_top) {
        var album_top = albumController.getTop(),
            width = window.innerWidth - 20,
            height = window.innerHeight,
            clip_top = album_top - page_top;

        $element.css({
          'clip': clip(clip_top, width, height, 10)
        });
      };

      image.crossOrigin = "anonymous";
      image.onload = draw;
      image.src = cors_url;

      container.append(canvas);
      Viewport.addListener('resize', draw);

      $scope.$on('homescroll', onScroll);
    }
  };

}]);
