ld.directive('ldAlbumArt', ['$filter', 'Viewport', 'CanvasUtils', function($filter, Viewport, CanvasUtils) {

  var blur_amt = 25;

  function to_px(val) {
    return $filter('StyleStrs')(val, 'px');
  };

  function to_clip(top, right, bottom, left) {
    var obj = { top: top, right: right, bottom: bottom, left: left };
    return $filter('StyleStrs')(obj, 'clip');
  };

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
          natural_height = 0,
          current_top = window.innerHeight,
          bounce_to = null;
      
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

      function resize() {

        function bounce() {
          draw();
          var page_top = Viewport.getTop();
          onScroll(page_top);
        };

        if(bounce_to)
          clearTimeout(bounce_to);

        bounce_to = setTimeout(bounce, 30);
      };

      function initialize() {
        natural_width = image.naturalWidth;
        natural_height = image.naturalHeight;
        Viewport.addListener('resize', resize);
      };

      function clip() {
        var t = current_top,
            r = window.innerWidth - 20,
            b = window.innerHeight,
            l = 10;

        $element.css({
          'clip': to_clip(t, r, b, l)
        });
      };

      function onScroll(page_top) {
        current_top = albumController.getTop() - page_top;
        clip();
      };

      image.crossOrigin = "anonymous";
      image.onload = initialize;
      image.src = cors_url;

      container.append(canvas);

      Viewport.addListener('scroll', onScroll);
    }
  };

}]);
