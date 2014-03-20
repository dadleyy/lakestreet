ld.directive('ldHomeSection', [function() {

  return {
    restrict: 'EA',
    link: function($scope, $element, $attrs) {

      function update() {
      };
  
      $scope.$on('homescroll', update);
    }
  };

}]);
