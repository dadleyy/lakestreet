var http = require('https'),
    btoa = require('btoa');

module.exports = function(grunt) {

  grunt.registerMultiTask('twitterauth', 'gets a brearer token for a twitter application', function() {
    var defer = this.async(),
        secret = this.data['secret'],
        key = this.data['key'],
        url_secret = encodeURIComponent(secret),
        url_key = encodeURIComponent(key),
        joined = [url_key, url_secret].join(':'),
        encoded = btoa(joined),
        options = {
          hostname: "api.twitter.com",
          port: 443,
          path: "/oauth2/token",
          method: "POST"
        },
        req;

    options['headers'] = {
      "Authorization": ["Basic", encoded].join(' '),
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };

    function receive(data) {
      var packet = JSON.parse(['',data].join(''));
      console.log(packet.access_token);
      defer();
    }


    req = http.request(options, function(res) {
      if(res.statusCode === 200)
        res.on('data', receive);
    });

    req.on('error', function(e) {
      defer();
    });

    req.write('grant_type=client_credentials');

    req.end();
  });

};
