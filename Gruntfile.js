/*global module,__dirname,__filename */
module.exports = function( grunt ) {
   'use strict';

   var serverPort = 8080;
   var liveReloadPort = 30000 + serverPort;

   grunt.initConfig( {
      pkg: grunt.file.readJSON( 'package.json' ),
      connect: {
         options: {
            port: serverPort,
            livereload: liveReloadPort
         },
         default: {

         },
         keepalive: {
            options: {
               port: serverPort,
               keepalive: true
            }
         }
      },
      watch: {
         options: {
            livereload: liveReloadPort,
            debounceDelay: 50
         },
         Gruntfile: {
            files: __filename,
            reload: true
         },
         dist: {
            files: [
               ['dist/**/*.*', 'index.html']
            ]
         }
      }
   } );

   grunt.loadNpmTasks( 'grunt-contrib-connect' );
   grunt.loadNpmTasks( 'grunt-contrib-watch' );

   grunt.registerTask( 'build', [  ] );
   grunt.registerTask( 'start', [ 'build', 'connect:default', 'watch' ] );
   grunt.registerTask( 'start-no-watch', [ 'build', 'connect:keepalive' ] );
   grunt.registerTask( 'default', [ 'build' ] );

};
