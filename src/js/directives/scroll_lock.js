ld.directive('ldScrollLock', [function() {

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    templateUrl: 'directives.scroll_lock',
    scope: { 'broadcastName': '@' },
    link:function($scope, $element, $attrs) {
      var edge = ($attrs['lockTo'] || 'top').toLowerCase(),
          b_name = $scope.broadcastName,
          locked = false;

      function lock() {
        locked = true;
        $element.addClass('locked').addClass(edge);
      };

      function unlock() {
        locked = false;
        $element.removeClass('locked').removeClass(edge);
      };

      function checkTop(page_top, offset) {
        if(offset.top < page_top) {
          if(!locked)
            lock();
        } else {
          if(locked)
            unlock();
        }
      };

      function checkBottom(page_top, offset) {
        var page_bottom = page_top + window.innerHeight,
            element_bottom = offset.top + $element.height();

        if(element_bottom < page_bottom) {
          if(!locked)
            lock();
        } else {
          if(locked)
            unlock();
        }
      };

      $scope.watchLock = function(page_top, bounding_box) {
        var offset = $element.offset();
        return (edge === 'top' ? checkTop : checkBottom)(page_top, offset);
      };
    }
  };

}]);
