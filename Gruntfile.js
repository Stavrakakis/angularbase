module.exports = function(grunt) {


    var LIVERELOAD_PORT = 35729;

    var lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });

    var mountFolder = function(connect, dir) {
        return connect.static(require('path')
            .resolve(dir));
    };

    // build variables

    var sourceFiles = ['app/js/**/*.js'],
        unitTestSpecs = ['test/unit/*Spec.js'],
        output = 'build/',
        scriptOutput = output + '/js/',
        outputScript = scriptOutput + 'app.js',
        minifiedScript = scriptOutput + 'app.min.js',
        unitTestReqs = ['./app/lib/angular/angular.js',
                        'app/lib/angular-route/angular-route.js',
                        'app/lib/angular-mocks/angular-mocks.js'];

    // define modules and settings

    grunt.initConfig({
        // load any package settings from package.json
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: sourceFiles,
                dest: outputScript
            }
        },
        copy: {
            main: {
                files: [
                {
                    cwd: 'app/',
                    expand: true,
                    src: ['partials/*.html'],
                    dest: output
                }, {
                    cwd: 'app/',
                    expand: true,
                    src: ['lib/**/*'],
                    dest: output
                }]
            },
        },
        uglify: {
            dist: {
                files: {
                    'build/js/app.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: sourceFiles,
            options: {
                eqeqeq: true,
                eqnull: true,
            }
        },
        jsbeautifier: {
            files: sourceFiles,
            options: {
                js: {
                    braceStyle: 'collapse',
                    indentChart: ' ',
                    indentSize: 4,
                    evalCode: true,
                    breakChainedMethods: true
                }
            }
        },
        sass: {
            dist: { // Target
                files: {
                  'app/style/css/main.css': 'app/style/sass/main.scss'
                }
            }
        },
        watch: {
            files: [sourceFiles, unitTestSpecs],
            tasks: ['build'],
            options: {
                livereload: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    hostname: 'localhost',
                    middleware: function(connect) {
                        return [lrSnippet, mountFolder(connect, 'build/')];
                    }
                }
            },

        },
        open: {
            dev: {
                path: 'http://localhost:<%= connect.server.options.port %>/_SpecRunner.html'
            }
        },
        jasmine: {
            dev: {
                src: sourceFiles,
                options: {
                    specs: unitTestSpecs,
                    vendor: unitTestReqs,
                    keepRunner: true
                }
            }
        },
        processhtml: {
            options: {
              // Task-specific options go here.
            },
            dist: {
              files: {
                'build/index.html': ['app/index.html']
              }
            },
          },
          
        clean: ['build']
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-jsdoc');


    // register tasks
    grunt.registerTask('prepare', ['clean', 'sass', 'jsbeautifier', 'jshint']);
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('build', ['prepare', 'test', 'concat', 'uglify', 'copy', 'processhtml']);
    grunt.registerTask('default', ['build', 'connect:server', 'open', 'watch']);

};
