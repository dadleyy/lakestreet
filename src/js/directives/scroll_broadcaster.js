ld.directive('ldScrollBroadcaster', [function() {

  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      var is_body = (element[0].nodeName).toLowerCase() === "body",
          $scoll_ele = is_body ? angular.element(window) : element,
          scoll_ele = $scoll_ele[0],
          broadcast_name = attrs['broadcastName'] || 'ldScroll';

      function update() {
        var ypos = scoll_ele[is_body ? 'scrollY' : 'scrollTop'];
        $scope.$broadcast(broadcast_name, ypos);
      }

      $scoll_ele.bind('scroll', update);
    }
  };

}]);
