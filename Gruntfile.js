module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-smash');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      scripts: ["public/js"],
      stylesheets: ["public/css"],
      soundmanager: ['public/swf'],
      svg: ['public/svg']
    },

    smash: {
      build: {
        src: "src/js/lakestreet.js",
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
          'public/js/app.min.js': ['public/js/app.js'],
          'public/js/templates.min.js': ['public/js/templates.js']
        }
      }
    },

    ngtemplates:  {
      build: {
        src: 'src/html/**/*.html',
        dest: 'public/js/templates.js',
        options: {
          module: 'lakestreet',
          url: function(url) { 
            return url.replace(/^src\/html\/(.*)\/(.*)\.html$/,'$1.$2');
          }
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/js/**/*.js', 'src/html/**/*.html'],
        tasks: ['clean:scripts','smash', 'ngtemplates', 'uglify']
      },
      stylesheets: {
        files: ['src/sass/**/*.sass'],
        tasks: ['clean:stylesheets','sass']
      },
      svg: {
        files: ['src/svg/**/*.svg'],
        tasks: ['clean:svg', 'copy:svg']
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
      }

    }

  });

  grunt.registerTask('default', ['clean:scripts','clean:stylesheets', 'smash','sass','ngtemplates','uglify']);
  grunt.registerTask('soundmanager', ['clean:soundmanager','copy:soundmanager']);

};
