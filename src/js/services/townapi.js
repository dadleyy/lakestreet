ld.service('TownApi', ['$resource', function($resource) {

  var TownApi = {},
      api_home = "/api/town";

  var artist_params = {artist_name: '@artist_name'};
  TownApi.Artist = $resource([api_home, 'artists/:artist_name/:fn'].join('/'), artist_params, {
    events: {
      method: 'GET',
      params: {
        fn: 'events'
      },
      isArray: true
    }

  });

  return TownApi;

}]);
