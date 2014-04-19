ld.directive('ldPlayButton', ['ICONS', function(ICONS) {

  return {
    restrict: 'EA',
    replace: true,
    require: '^ldTrack',
    templateUrl: 'directives.play_button',
    link: function($scope, $element, $attrs, track) {
      var svg = d3.select($element.get(0)).append('svg'),
          formula = d3.superformula();

    }
  };

}]);
