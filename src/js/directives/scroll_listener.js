ld.directive('ldScrollListener', ['Viewport', function(Viewport) { 
    
  return {
    restrict: 'A',
    scope: { callback: '=' },
    link: function($scope, $element, $attrs) {
      var listen_evt = $attrs['broadcastName'];

      function update(evt, page_top) {
        if(angular.isFunction($scope.callback))
          $scope.callback(page_top ? page_top : evt);
      }
    
      if(listen_evt) 
        $scope.$on(listen_evt, update);
      else
        Viewport.addListener('scroll', update);
    }
  };

}]);
