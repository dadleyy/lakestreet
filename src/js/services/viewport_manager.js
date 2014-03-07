ld.service('ViewportManager', ['$window', function($window) {

  var ViewportManager = {},
      listeners = [];

  function update() {
    for(var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  };
  
  ViewportManager.addListener = function(fn) {
    if(angular.isFunction(fn))
      listeners.push(fn);
  };

  angular.element($window).bind('resize', update);

  return ViewportManager;

}]);
