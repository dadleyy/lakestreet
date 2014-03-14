ld.service('MenuManager', ['$rootScope', function($rootScope) {

  var MenuManager = {},
      stack = [],
      uid_index = 0;

  function menuUid() {
    uid_index ++;
    return btoa(['menu',uid_index].join(':'));
  };

  function add(close_fn) {
    var wrap = function() { close_fn(); };
    wrap.menu_id = menuUid();
    stack.push(wrap);
    return wrap.menu_id;
  };

  function closeNext() {
    if(stack.length < 1)
      return;
    
    stack[stack.length - 1]();

    try {
      $rootScope.$digest();
    } catch(e) { }
  };

  MenuManager.push = function(close_fn) {
    if(!angular.isFunction(close_fn))
      return null;

    return add(close_fn);
  };

  MenuManager.pop = function(id) {
    var indx = null;
    for(var i = 0; i < stack.length; i++) {
      if(stack[i].menu_id === id)
        indx = i;
    }

    stack.splice(indx,1);
  };

  angular.element(window).click(closeNext);

  return MenuManager;

}]);
