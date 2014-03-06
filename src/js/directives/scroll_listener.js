ld.directive('ldScrollListener', ['HtmlUtils', function(HtmlUtils) { 
    
  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      var ele_top, ele_bottom,
          buffer, listen_evt = attrs['broadcastName'] || 'ldScroll';

      function update(evt, page_top) {
        var window_height = window.innerHeight,
            buffer = window_height * 0.5,
            in_view, offset = { x: 0, y: 0 };

        HtmlUtils.getOffset(element[0], offset);
        ele_bottom = element[0].offsetHeight + offset.y;
        in_view = (offset.y + buffer < window_height + page_top) && (ele_bottom - buffer > page_top);
        element[in_view ? 'addClass' : 'removeClass']('in-view');
      }

      $scope.$on(listen_evt, update);
    }
  };

}]);
