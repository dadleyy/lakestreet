ld.provider('SoundManager', [function() {

  var SoundManager = {},
      instance = {},
      ext = angular.extend,
      fns = {},

      active_sound = null;

  fns.setActiveSound = function(sound) {
    if(active_sound)
      active_sound.stop();

    active_sound = sound;
  };

  SoundManager.route_resolution = ['$q', function($q) {
    var deferred = $q.defer();

    function finished() {
      ext(instance, SM, fns);
      deferred.resolve(instance);
    }

    SM.setup({
      debugMode: false,
      onready: finished
    });

    return deferred.promise;
  }];

  SoundManager['$get'] = function() {
    return instance;
  };

  return SoundManager;

}]);
