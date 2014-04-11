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
      uid_index = 0,
      current_time = Date.now() * 0.001,
      check_to = null;

  for(var x = 0; x < vendors.length && !request; ++x) {
    request = window[vendors[x]+'RequestAnimationFrame'];
    cancel = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if(!request) {
    request = function(callback, element) {
      var cur_time = Date.now(),
          time_to_call = Math.max(0, 16 - (cur_time - last_time)),
          id = window.setTimeout(function(){ callback(cur_time + time_to_call); }, time_to_call);

      last_time = cur_time + time_to_call;
      return id;
    };
  }

  if(!cancel) {
    cancel = function(id) {
      clearTimeout(id);
    };
  }

  function start() {
    current_time = Date.now() * 0.001;
    running = true;
    raf_id = request(update);
  };

  function update() {
    var t = Date.now() * 0.001,
        dt = t - current_time;

    for(var i = 0; i < callbacks.length; i++)
      callbacks[i](dt);

    if(running)
      raf_id = request(update);
   
    clearTimeout(check_to);
    check_to = setTimeout(checkEnd, 10);

    current_time = t;
  };

  function loopUid() {
    uid_index ++;
    return btoa([uid_index,'id'].join(''));
  };

  function checkEnd() {
    if(callbacks.length === 0)
      running = false;
  };

  Loop.add = function(fn) {
    if(!angular.isFunction(fn))
      return null;

    var wrap = function(dt) { fn(dt); };
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
  };

  return Loop;

}]);
