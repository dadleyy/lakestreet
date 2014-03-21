ld.filter('StyleStrs', [function() {

  function to_clip(input) {
    var top = to_px(input.top),
        left = to_px(input.left),
        bottom = to_px(input.bottom),
        right = to_px(input.right),
        points = [top, right, bottom, left].join(',');

    return ['rect(', points, ')'].join('');
  };

  function to_px(input) {
    return [input, 'px'].join('');
  };

  return function(input, fn) {
    var output = input;

    switch(fn) {
      case 'clip':
        output = to_clip(input);
        break;
      case 'px': 
        output = to_px(input);
        break;
      default:
        break;
    };

    return output;
  };

}]);
