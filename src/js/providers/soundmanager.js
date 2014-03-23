(function(SM) {

var deferred_load,
    initialized = false;

function finished() {
  if(deferred_load)
    deferred_load.resolve();

  initialized = true;
}

SM.flashVersion = 9;
SM.preferFlash = true;
SM.flash9Options = {
  useWaveformData: true 
};

SM.setup({
  debugMode: false,
  preferFlash: true,
  flashVersion: 9,
  url: '/swf/',
  onready: finished
});

ld.provider('SoundManager', [function() {

  var instance = null,
      active_sound = null,
      $rootScope;

  function SoundManager() { };

  SoundManager.prototype = soundManager;

  SoundManager.prototype.setActiveSound = function(sound) {
    if(active_sound)
      active_sound.stop();

    active_sound = sound;
  };

  SoundManager.route_resolution = ['$q', function($q) {
    if(initialized)
      return true;

    deferred_load = $q.defer();

    return deferred_load.promise;
  }];

  SoundManager['$get'] = ['$rootScope', function() {
    $rootScope = arguments[0];

    if(!instance)
      instance = new SoundManager();

    return instance;
  }];

  return SoundManager;

}]);

})(soundManager);
