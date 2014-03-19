ld.directive('ldHomeSection', [function() {

  return {
    restrict: 'EA',
    link: function($scope, $element, $attrs) {

      function update() {
        console.log('whoa');
      };
  

      $scope.$on('homescroll', update);
    }
  };

}]);
