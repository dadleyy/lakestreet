ld.service('CampApi', ['$resource', 'AK', function($resource, AK) {

  var CampApi = {},
      api_home = "/api/camp",
      ext = angular.extend,
      defp = { key: AK },
      band_params, band_url,
      album_params, album_url;

  band_params = ext({}, defp, { band_id: '@band_id' });
  band_url = [api_home, 'band/3/:fn'].join('/');
  CampApi.Band = $resource(band_url, band_params, {
    info: {
      method: 'GET',
      params: { fn: 'info' }
    },
    discography: {
      method: 'GET',
      params: { fn: 'discography' }
    }
  });

  album_params = ext({}, defp, {album_id: '@album_id'});
  album_url = [api_home, 'album/2/:fn'].join('/');
  CampApi.Album = $resource(album_url, album_params, {
    info: {
      method: 'GET',
      params: { fn: 'info' }
    }
  });

  return CampApi;

}]);
