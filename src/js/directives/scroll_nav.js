ld.directive('ldScrollNav', [function() {

  function ScrollNav($scope) {
    this.sections = { };
    this.root = null;
  };

  ScrollNav.prototype.register = function(name, element) {
    if(!angular.isString(name) || !element || !element.jquery)
      return false;

    this.sections[name.toLowerCase()] = element;
  };

  ScrollNav.prototype.goTo = function(dest) {
    var $dest = this.sections[dest],
        d_top = $dest.offset().top;

    this.root.stop().animate({scrollTop: d_top}, 800);
  };

  ScrollNav.prototype.setRoot = function(element) {
    this.root = element;
  };

  ScrollNav.$inject = ['$scope'];

  return {
    restrict: 'EA',
    controller: ScrollNav,
    link: function($scope, $element, $attrs, scrollNav) {
      scrollNav.setRoot($element);

      function update(evt, dest) {
        if(angular.isString(dest))
          return scrollNav.goTo(dest.toLowerCase());
      };

      $scope.$on('navigate', update);
    }
  };

}]);
