ld.directive('ldPlayButton', ['ICONS', '$rootScope', function(ICONS, $rootScope) {

  return {
    restrict: 'EA',
    replace: true,
    require: '^ldTrack',
    templateUrl: 'directives.play_button',
    link: function($scope, $element, $attrs, trackController) {
      var svg = d3.select($element.get(0)).append('svg'),
          formula = d3.superformula().segments(100).size(420).type('triangle'),
          group = svg.append('g'),
          path = group.append('path'),
          width = 40,
          height = 40;

      function toggle() {
        var active = trackController.getState();

        if(!active)
          trackController.play();
        else
          trackController.stop();

        $rootScope.$digest();
      };

      function update() {
        var active = trackController.getState(),
            shape = formula.type(active ? 'square' : 'triangle');

        path.transition().duration(200).attr("d", shape).attr({transform: active ? 'scale(1.0)' : 'scale(1.3)'});
      };

      svg.attr({width: width, height: height});

      group.attr({
        'transform': ['translate(', (width * 0.5), ',', (height * 0.5), ')'].join('')
      });

      path.attr("d", formula).attr({
        fill: "#414141", 
        transform: 'scale(1.3)'
      }).style({'cursor': 'pointer'}).on('click', toggle);

      $element.css({marginLeft: -(width * 0.5), marginTop: -(height * 0.5)});

      $scope.$on('trackPlay', update);
      $scope.$on('trackStop', update);
    }
  };

}]);
