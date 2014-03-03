ld.directive('ldTextSplitter', [function() {

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.text_splitter',
    link: function($scope, element, attrs) {
      var on_to = null,
          out_to = null,
          start_to = null,
          drop_to = null,
          is_open = false;

      function clearTimeouts() {
        if(on_to) {
          clearTimeout(on_to);
          on_to = null;
        }

        if(out_to) {
          clearTimeout(out_to);
          out_to = null;
        }
      }

      function startSplit() {
        clearTimeouts();
        element.addClass('an-in');
        on_to = setTimeout(anOn, 600);
        try {
        $scope.$digest();
        } catch(e) { }
      }

      function dropSplit() {
        clearTimeouts();
        element.removeClass('an-on');
        out_to = setTimeout(anOut, 600);
        try {
          $scope.$digest();
        } catch(e) { }
      }

      function anOn() {
        element.addClass('an-on');
        try {
          $scope.$digest();
        } catch(e) { }
      }

      function anOut() {
        element.removeClass('an-in');
        try {
          $scope.$digest();
        } catch(e) { }
      }

      $scope.toggle = function() {
        is_open = !is_open;
        if( is_open )
          startSplit();
        else
          dropSplit();
      }
    }
  };

}]);
