ld.service('Viewport', ['$window', 'Loop', function($window, Loop) {

  var Viewport = {},
      listeners = {
        'resize': []
      },
      resizer;

  function runner(evt_name) {
    var running = false,
        loop_id = null,
        cancel_to = null;

    function run() {
      for(var i = 0; i < listeners[evt_name].length; i++) {
        listeners[evt_name][i]();
      }
    };

    function cancel() {
      Loop.remove(loop_id);
      loop_id = null;
    };

    return (function() {
      if(!loop_id)
        loop_id = Loop.add(run);

      cancel_to = setTimeout(cancel, 30);
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
