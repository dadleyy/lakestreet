ld.service('Viewport', ['$window', function($window) {

  var Viewport = {},
      listeners = {
        'resize': []
      };

  function runner(evt_name) {
    return (function() {
      for(var i = 0; i < listeners[evt_name].length; i++ ) {
        listeners[evt_name][i]();
      }
    });
  };
  
  Viewport.addListener = function(evt, fn) {
    if(angular.isFunction(fn) && listeners[evt])
      listeners[evt].push(fn);
  };

  angular.element($window).bind('resize', runner('resize'));

  return Viewport;

}]);
