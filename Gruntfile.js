module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-smash');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: ["public/js"],

    smash: {
      build: {
        src: "src/lakestreet.js",
        dest: "public/js/app.js"
      }
    },

    compass: {
      build: {
        options: {
          sassDir: 'sass',
          cssDir: 'public/css'
        }
      }
    }

  });

  grunt.registerTask('default', ['clean','smash','compass']);

};
