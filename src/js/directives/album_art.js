ld.directive('ldAlbumArt', ['Viewport', 'CanvasUtils', function(Viewport, CanvasUtils) {

  var blur_amt = 25;

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
          container = $element,
          natural_width = 0,
          natural_height = 0;
      
      function draw() {
        var container_width = container.width(),
            contianer_height = container.height(),
            image_data, pixel_data,
            final_data = [],
            scale_width = container_width > contianer_height,
            scale = scale_width ? (container_width / natural_width) : (contianer_height / natural_height),
            w, h, width_diff;

        h = scale_width ? natural_height * scale : contianer_height;
        w = scale_width ? container_width : natural_width * scale;

        canvas.width = w;
        canvas.height = h;

        context.drawImage(image, 0, 0, w, h);

        image_data = context.getImageData(0, 0, w, h);
        pixel_data = image_data.data;

        CanvasUtils.grey(pixel_data);
        CanvasUtils.blur(blur_amt, pixel_data, w, h);
        
        context.putImageData(image_data, 0, 0);
      };

      function px(num) {
        return [num, 'px'].join('');
      };

      function initialize() {
        natural_width = image.naturalWidth;
        natural_height = image.naturalHeight;
        Viewport.addListener('resize', draw);
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
      image.onload = initialize;
      image.src = cors_url;

      container.append(canvas);

      $scope.$on('homescroll', onScroll);
    }
  };

}]);
