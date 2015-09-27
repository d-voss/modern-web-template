/*global module,__dirname,__filename */
module.exports = function( grunt ) {
   'use strict';

   var serverPort = 8080;
   var liveReloadPort = 30000 + serverPort;

   grunt.initConfig( {
      pkg: grunt.file.readJSON( 'package.json' ),
      // Autoprefixer
      autoprefixer: {
         options: {
            browsers: [
               'ff >= 32',
               'chrome >= 32',
               'ie >= 10'
            ],
            map: true // Update source map (creates one if it can't find an existing map)
         },
         // Prefix all files
         multiple_files: {
            flatten: true,
            src: 'dist/css/main.css'
         },
      },
      concat: {
         options: {
            separator: ';'
         },
         base: {
            src: [
               'src/js/file-1.js',
               'src/js/file-2.js'
            ],
            dest: 'dist/js/main.js'
         }
      },
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
      cssmin: {
         options: {
            keepSpecialComments: 0 // remove all comments
         },
         minify: {
            expand: true,
            cwd: 'dist/css/',
            src: ['main.css'],
            dest: 'dist/css/',
            ext: '.min.css'
         }
      },
      modernizr: {
         dist: {
            // Avoid unnecessary builds (see Caching section below)
            'cache': true,
            // Path to save out the built file
            "dest": "dist/js/modernizr-custom.min.js",

            // By default, will crawl your project for references to Modernizr tests
            // Set to false to disable
            "crawl": true,

            // Define any tests you want to explicitly include
            "tests": [
               "touchevents",
               "objectfit"
            ],
            // Based on default settings on http://modernizr.com/download/
            "options": [
               "setClasses",
               "addTest"
            ],
            // By default, source is uglified before saving
            "uglify": true
         }
      },
      // Grunt-sass
      sass: {
         app: {
            // Takes every file that ends with .scss from the scss
            // directory and compile them into the css directory.
            // Also changes the extension from .scss into .css.
            // Note: file name that begins with _ are ignored automatically
            files: [{
              expand: true,
              cwd: 'src/scss',
              src: ['*.scss'],
              dest: 'dist/css',
              ext: '.css'
            }]
         },
         options: {
            sourceMap: true,
            outputStyle: 'nested',
            imagePath: "../",
         }
      },
      uglify: {
         build: {
            src: 'dist/js/main.js',
            dest: 'dist/js/main.min.js'
         }
      },
      watch: {
         options: {
            livereload: liveReloadPort,
            spawn: false
         },
         Gruntfile: {
            files: __filename,
            reload: true
         },
         dist: {
            files: [
               ['dist/**/*.*', '*.html']
            ]
         },
         js: {
            files: ['src/js/*.js'],
            tasks: ['concat']
         },
         sass: {
            // Watches all Sass or Scss files within the scss folder and one level down.
            // If you want to watch all scss files instead, use the "**/*" globbing pattern
            files: ['src/scss/{,*/}*.{scss,sass}'],
            // runs the task `sass` whenever any watched file changes
            tasks: ['sass', 'autoprefixer' ]
         },
      }
   } );

   grunt.loadNpmTasks( 'grunt-autoprefixer' );
   grunt.loadNpmTasks( 'grunt-contrib-concat' );
   grunt.loadNpmTasks( 'grunt-contrib-connect' );
   grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
   grunt.loadNpmTasks( 'grunt-contrib-uglify' );
   grunt.loadNpmTasks( 'grunt-contrib-watch' );
   grunt.loadNpmTasks( 'grunt-modernizr' );
   grunt.loadNpmTasks( 'grunt-sass' );

   grunt.registerTask('start', ['develop', 'connect:default', 'watch']);
   grunt.registerTask('release', ['sass', 'autoprefixer', 'cssmin', 'modernizr', 'concat', 'uglify', 'connect:keepalive']);
   grunt.registerTask('develop', ['sass', 'autoprefixer', 'modernizr', 'concat']);
   grunt.registerTask('default', ['develop']);

};
