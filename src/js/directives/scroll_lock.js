ld.directive('ldScrollLock', [function() {

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    templateUrl: 'directives.scroll_lock',
    link:function($scope, element, attrs) {
      var edge = (attrs['lockTo'] || 'top').toLowerCase();

      function checkTop(page_top, bounding_box) {
        if(bounding_box.top < page_top) {
          element.addClass('locked').addClass('top');
        } else {
          element.removeClass('locked').removeClass('top');
        }
      };

      function checkBottom(page_top, bounding_box) {
        var page_bottom = page_top + window.innerHeight;
        if(bounding_box.bottom < page_bottom) {
          element.addClass('locked').addClass('bottom');
        } else {
          element.removeClass('locked').removeClass('bottom');
        }
      };

      $scope.watchLock = function(page_top, bounding_box) {
        return (edge === 'top' ? checkTop : checkBottom)(page_top, bounding_box);
      }
    }
  };

}]);
