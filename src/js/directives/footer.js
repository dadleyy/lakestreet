ld.directive('ldFooter', [function() {

  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'directives.footer',
    link: function($scope, $element, $attrs) {
    }
  };

}]);
