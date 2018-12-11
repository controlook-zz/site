module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    sass: {
      app: {
        files: [
          {
            expand: true,
            cwd: "scss",
            src: ["*.scss"],
            dest: "assets/css",
            ext: ".css"
          }
        ]
      },
      options: {
        sourceMap: true,
        outputStyle: "compact",
        imagePath: "../"
      }
    },

    watch: {
      sass: {
        files: ["scss/{,*/}*.{scss,sass}"],
        tasks: ["sass"]
      },
      options: {
        livereload: true,
        spawn: false
      }
    }
  });

  // Loads Grunt Tasks
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Default task(s).
  // grunt.registerTask('default', ['sass', 'watch']);
  grunt.registerTask("default", ["sass", "watch"]);
};
