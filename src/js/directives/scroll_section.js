ld.directive('ldScrollSection', [function() {

  return {
    restrict: 'EA',
    require: '^ldScrollNav',
    link: function($scope, $element, $attrs, scrollNav) {
      scrollNav.register($attrs['name'], $element);
    }
  };

}]);
