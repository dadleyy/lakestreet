ld.directive('ldScrollListener', [function() { 
    
  return {
    restrict: 'A',
    scope: { callback: '=' },
    link: function($scope, $element, $attrs) {
      var ele_top, 
          ele_bottom,
          buffer, 
          listen_evt = $attrs['broadcastName'] || 'ldScroll';

      function update(evt, page_top) {
        var window_height = window.innerHeight,
            buffer = window_height * 0.5,
            offset = { x: 0, y: 0 },
            client_rect = $element[0].getBoundingClientRect(),
            in_view;

        offset = $element.offset();
        ele_bottom = client_rect.height + offset.y;

        if(angular.isFunction($scope.callback))
          $scope.callback(page_top, offset);
      }

      $scope.$on(listen_evt, update);
    }
  };

}]);
