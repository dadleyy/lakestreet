ld.directive('ldScrollListener', ['HtmlUtils', function(HtmlUtils) { 
    
  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      var ele_top,
          ele_bottom,
          buffer;

      function update(evt, page_top) {
        var window_height = window.innerHeight,
            buffer = window_height * 0.5,
            in_view;

        ele_top = element[0].offsetTop;
        ele_bottom = element[0].offsetHeight + ele_top;
        in_view = (ele_top + buffer < window_height + page_top) && (ele_bottom - buffer > page_top);
        element[in_view ? 'addClass' : 'removeClass']('in-view');
      }

      $scope.$on('ldScroll', update);
    }
  };

}]);
