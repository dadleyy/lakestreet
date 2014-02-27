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
          'public/js/app.min.js': ['public/js/app.js']
        }
      }
    },

    ngtemplates:  {
      app: {
        src: 'src/html/**.html',
        dest: 'public/js/templates.js'
      }
    }

  });

  grunt.registerTask('default', ['clean','smash','compass','uglify','ngtemplates']);

};
