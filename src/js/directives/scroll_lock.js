ld.directive('ldScrollLock', [function() {

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    templateUrl: 'directives.scroll_lock',
    link:function($scope, element, attrs) {
      $scope.watchLock = function(page_top, bounding_box) {
        if(bounding_box.top < page_top) {
          element.addClass('locked');
        } else {
          element.removeClass('locked');
        }
      }
    }
  };

}]);
