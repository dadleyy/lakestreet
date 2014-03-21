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
  grunt.loadTasks('tasks');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      scripts: ["obj", "public/js"],
      stylesheets: ["public/css"],
      soundmanager: ['public/swf'],
      svg: ['public/svg']
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
      svg: {
        files: ['src/svg/**/*.svg'],
        tasks: ['clean:svg', 'copy:svg']
      },
      html:{
        files: ['src/html/index.hml'],
        tasks: ['copy:index']
      }
    },

    copy: {
      soundmanager: {
        expand: true,
        src: ['bower_components/soundmanager2/swf/*'],
        dest: 'public/swf/',
        flatten: true
      },
      svg: {
        expand: true,
        src: ['src/svg/*'],
        dest: 'public/svg/',
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

  var default_task = ['clean:scripts','clean:stylesheets', 'twitterauth', 'ngtemplates', 'smash','sass','uglify', 'svg', 'copy:index']
  grunt.registerTask('default', default_task);
  grunt.registerTask('soundmanager', ['clean:soundmanager','copy:soundmanager']);
  grunt.registerTask('svg', ['clean:svg', 'copy:svg']);

};
