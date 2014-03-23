module.exports = function(config) {

  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      "bower_components/angular/angular.js",
      "bower_components/angular-resource/angular-resource.js",
      "bower_components/angular-route/angular-route.js",
      "bower_components/angular-mocks/angular-mocks.js",
      "bower_components/jquery/dist/jquery.js",
      "bower_components/soundmanager2/script/soundmanager2.js",
      "bower_components/d3/d3.js",
      "obj/app.js",
      "obj/twitter.js",
      "obj/templates.js",
      "spec/**/*_spec.js",
    ],

    exclude: [
    ],

    preprocessors: {
    },

    reporters: [
      'progress',
      'junit'
    ],

    junitReporter: {
      outputFile: 'test-results.xml'
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome'],

    proxies: {
      '/swf': 'http://lakestreet.sizethreestudios.com/swf'
    },

    singleRun: true 

  });

};
