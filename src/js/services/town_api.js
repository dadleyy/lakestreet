ld.service('TownApi', ['$resource', function($resource) {

  var TownApi = {},
      api_home = "http://cpx.sizethreestudios.com/api/town",
      artist_params,
      artist_url;

  artist_params = {artist_name: '@artist_name'};
  artist_url = [api_home, 'artists/:artist_name/:fn'].join('/');
  TownApi.Artist = $resource(artist_url, artist_params, {
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
