ld.directive('ldTooltip', [function() {

  var valid_alignments = ["top","bottom"];

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.tooltip',
    scope: { text: '@' },
    link: function($scope, $element, $attrs) {
      $scope.align = $attrs['align'];

      var $span = $element.children('span'),
          valid = valid_alignments.indexOf($scope.align) !== -1;

      $scope.align = valid ? $scope.align : 'top';

      function onHover() {
        var width = $span.outerWidth();
        $span.css({marginLeft: -width * 0.5});
        $element.addClass('over');
      };

      function offHover() {
        $element.removeClass('over');
      };

      $element.parent().hover(onHover, offHover);
    }
  };

}]);
