ld.service('Viewport', ['$window', function($window) {

  var Viewport = {},
      listeners = {
        'resize': []
      },
      resizer;

  function runner(evt_name) {
    return (function() {
      for(var i = 0; i < listeners[evt_name].length; i++ ) {
        listeners[evt_name][i]();
      }
    });
  };
  
  Viewport.addListener = function(evt, fn) {
    if(angular.isFunction(fn) && listeners[evt]) {
      listeners[evt].push(fn);
      fn();
    }

  };

  resizer = runner('resize');
  angular.element($window).bind('resize', resizer);

  return Viewport;

}]);
