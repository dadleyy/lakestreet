(function(SM) {

var deferred_load;

function finished() {
  deferred_load.resolve(SM);
}

SM.flashVersion = 9;
SM.preferFlash = true;

SM.setup({
  debugMode: false,
  preferFlash: true,
  flashVersion: 9,
  url: '/swf/',
  onready: finished
});

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
    deferred_load = $q.defer();
    deferred_load.promise.then(function() {
      instance = ext(SM, fns);
    });
    return deferred_load.promise;
  }];

  SoundManager['$get'] = function() {
    return instance;
  };

  return SoundManager;

}]);

})(soundManager);
