ld.directive('ldScrollListener', ['HtmlUtils', function(HtmlUtils) { 
    
  return {
    restrict: 'A',
    scope: { callback: '=' },
    link: function($scope, element, attrs) {
      var ele_top, 
          ele_bottom,
          buffer, 
          listen_evt = attrs['broadcastName'] || 'ldScroll';

      function update(evt, page_top) {
        var window_height = window.innerHeight,
            buffer = window_height * 0.5,
            offset = { x: 0, y: 0 },
            in_view;

        HtmlUtils.getOffset(element[0], offset);
        ele_bottom = element[0].offsetHeight + offset.y;

        if(angular.isFunction($scope.callback))
          $scope.callback(page_top, {top: offset.y, bottom: ele_bottom});
      }

      $scope.$on(listen_evt, update);
    }
  };

}]);
