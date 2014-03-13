ld.config(['$routeProvider', 'SoundManagerProvider', function($routeProvider, SoundManagerProvider) {

  var home = {
    templateUrl: 'views.home',
    controller: 'HomeController',
    resolve: {
      Albums: ['$q', 'CampApi', 'XhrMonitor', 'ALBUM_IDS', function($q, CampApi, XhrMonitor, ALBUM_IDS) {
        var defer = $q.defer(),
            albums = [];
        
        function checkStatus(album) {
          var finished = true;
          
          for(var i = 0; i < albums.length; i++) {
            if(albums[i].$resolved !== true) 
              finished = false;
          }

          if(finished)
            defer.resolve(albums);
        }

        function failOut() {
          defer.reject();
        };

        for(var i = 0; i < ALBUM_IDS.length; i++) {
          var album = new CampApi.Album({album_id: ALBUM_IDS[i]}),
              promise = album.$info();

          promise.then(checkStatus, failOut);
          albums.push(album);
        }

        return defer.promise;
      }],
      Events: ['$q', 'TownApi', function($q, TownApi) {
        var events = TownApi.Artist.events({artist_name: "lakestreetdive"});
        return events.$promise;
      }],
      sm: SoundManagerProvider.route_resolution
    },

  };

  $routeProvider.when('/home', home);

}]);
