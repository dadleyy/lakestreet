ld.service('Viewport', ['$window', 'Loop', function($window, Loop) {

  var Viewport = {},
      listeners = {
        'resize': [],
        'scroll': []
      },
      resizer;

  function runner(evt_name, paramFn) {
    var running = false,
        loop_id = null,
        cancel_to = null;

    function run() {
      var param = null;
      if(paramFn)
        param = paramFn();

      for(var i = 0; i < listeners[evt_name].length; i++) {
        listeners[evt_name][i](param);
      }
    };

    function cancel() {
      Loop.remove(loop_id);
      loop_id = null;
    };

    return (function() {
      if(!loop_id)
        loop_id = Loop.add(run);

      if(cancel_to)
        clearTimeout(cancel_to);

      cancel_to = setTimeout(cancel, 30);
    });
  };

  Viewport.getTop = function() {
    var document_fallback = document.documentElement || document.body.parentNode || document.body,
        page_top = (window.pageYOffset !== undefined) ? window.pageYOffset : document_fallback.scrollTop;

    return page_top; 
  };
  
  Viewport.addListener = function(evt, fn) {
    if(angular.isFunction(fn) && listeners[evt]) {
      listeners[evt].push(fn);
      fn();
    }
  };

  resizer = runner('resize');
  scroller = runner('scroll', Viewport.getTop);
  angular.element($window).bind('resize', resizer);
  angular.element($window).bind('scroll', scroller);

  return Viewport;

}]);
