ld.service('Loop', ['$filter', function($filter) {
  
  var Loop = { },
      running = false,
      callbacks = [],
      raf_id = null,
      last_time = 0,
      filter_fn = $filter('filter'),
      vendors = ['ms', 'moz', 'webkit', 'o'],
      request = window.requestAnimationFrame,
      cancel = window.cancelAnimationFrame,
      uid_index = 0;

  for(var x = 0; x < vendors.length && !request; ++x) {
    request = window[vendors[x]+'RequestAnimationFrame'];
    cancel = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if(!request) {
    request = function(callback, element) {
      var cur_time = new Date().getTime(),
          time_to_call = Math.max(0, 16 - (cur_time - last_time)),
          id = window.setTimeout(function(){ callback(cur_time + time_to_call); }, time_to_call);

      last_time = cur_time + time_to_call;
      return id;
    };
  }

  if(cancel) {
    cancel = function(id) {
      clearTimeout(id);
    };
  }

  function start() {
    running = true;
    raf_id = request(update);
  };

  function stop() {
    running = false;
    cancel(raf_id);
  };
  
  function update() {
    for(var i = 0; i < callbacks.length; i++)
      callbacks[i]();

    if(running && callbacks.length > 0)
      raf_id = request(update);
  };

  function loopUid() {
    uid_index ++;
    return btoa([uid_index,'id'].join(''));
  };

  Loop.add = function(fn) {
    if(!angular.isFunction(fn))
      return null;

    var wrap = function() { fn(); };
    wrap.$lid = loopUid();
    callbacks.push(wrap);
    
    if(!running)
      start();

    return wrap.$lid;
  };

  Loop.remove = function(loop_id) {
    var indx = null;

    for(var i = 0; i < callbacks.length; i++) {
      if(callbacks[i].$lid === loop_id)
        indx = i;
    }

    callbacks.splice(indx, 1);

    if(callbacks.length === 0)
      stop();
  };

  return Loop;

}]);
