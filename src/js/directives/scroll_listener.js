ld.directive('ldScrollListener', [function() { 
    
  return {
    restrict: 'A',
    scope: { callback: '=' },
    link: function($scope, $element, $attrs) {
      var listen_evt = $attrs['broadcastName'] || 'ldScroll';

      function update(evt, page_top) {
        if(angular.isFunction($scope.callback))
          $scope.callback(page_top);
      }

      $scope.$on(listen_evt, update);
    }
  };

}]);
