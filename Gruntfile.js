var dotenv = require('dotenv');

module.exports = function(grunt) {

  dotenv.load();

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-smash');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadTasks('tasks');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      scripts: ["obj", "public/js"],
      stylesheets: ["public/css"],
      soundmanager: ['public/swf']
    },

    smash: {
      build: {
        src: "src/js/lakestreet.js",
        dest: "obj/app.js"
      },
      app: {
        src: "build.js",
        dest: "public/js/app.js"
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      jenkins: {
        configFile: 'karma.jenkins.conf.js'
      }
    },

    sass: {
      build: {
        options: {
          loadPath: require('node-neat').includePaths
        },
        files: {
          'public/css/app.css': 'src/sass/app.sass'
        }
      }
    },

    jade: {
      debug: {
        files: {
          "public/index.html": "src/jade/index.jade"
        }
      },
      release: {
        options: {
          data: {
            min: true
          }
        },
        files: {
          "public/index.html": "src/jade/index.jade"
        }
      }
    },

    uglify: {
      build: {
        files: {
          'public/js/app.min.js': ['public/js/app.js']
        }
      }
    },

    ngtemplates:  {
      build: {
        src: 'src/html/templates/**/*.html',
        dest: 'obj/templates.js',
        options: {
          module: 'lakestreet',
          url: function(url) { 
            return url.replace(/^src\/html\/templates\/(.*)\/(.*)\.html$/,'$1.$2');
          }
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/js/**/*.js', 'src/html/**/*.html'],
        tasks: ['clean:scripts','ngtemplates', 'twitterauth', 'smash', 'uglify']
      },
      stylesheets: {
        files: ['src/sass/**/*.sass'],
        tasks: ['clean:stylesheets','sass']
      },
      jade: {
        files: ['src/jade/**/*.jade'],
        tasks: ['jade']
      }
    },

    copy: {
      soundmanager: {
        expand: true,
        src: ['bower_components/soundmanager2/swf/*'],
        dest: 'public/swf/',
        flatten: true
      },
      index: {
        expand: true,
        src: ['src/html/index.html'],
        dest: 'public/',
        flatten: true
      }
    },

    twitterauth: {
      lakestreet: {
        key: process.env['TWITTER_KEY'],
        secret: process.env['TWITTER_SECRET'],
        save_to: 'obj/twitter.js',
        module: 'lakestreet'
      }
    }

  });

  var default_task = [
    'clean:scripts',
    'clean:stylesheets', 
    'twitterauth', 
    'ngtemplates', 
    'smash',
    'sass', 
    'uglify', 
    'soundmanager',
    'jade:debug'
  ];
  grunt.registerTask('default', default_task);
  grunt.registerTask('soundmanager', ['clean:soundmanager','copy:soundmanager']);

};
