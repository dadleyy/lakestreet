module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-smash');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      scripts: ["public/js"],
      stylesheets: ["public/css"]
    },

    smash: {
      build: {
        src: "src/js/lakestreet.js",
        dest: "public/js/app.js"
      }
    },

    compass: {
      build: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'public/css'
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
        tasks: ['clean:stylesheets','compass']
      },
      
    }

  });

  grunt.registerTask('default', ['clean:scripts','clean:stylesheets', 'smash','compass','ngtemplates','uglify']);

};
