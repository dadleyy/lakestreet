module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-smash');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: ["public/js", "public/css"],

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
    }

  });

  grunt.registerTask('default', ['clean','smash','compass','ngtemplates','uglify']);

};
