ld.service('TwitterApi', ['$resource', 'TWITTER_API_KEY', function($resource, TWITTER_API_KEY) {

  var TwitterApi = {},
      api_home = "/api/twit/1.1",
      auth_header = { "Authorization": ["Bearer", TWITTER_API_KEY].join(' ') },
      timeline_url,
      timeline_params,
      
  timeline_url = [api_home, "statuses/user_timeline.json"].join('/');
  TwitterApi.Timeline = $resource(timeline_url, timeline_params, {
    get: {
      method: "get",
      headers: auth_header,
      isArray: true
    }
  });

  return TwitterApi;

}]);
