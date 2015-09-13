'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('bruncko.json'),
        www: 'www',
        bower: 'www/bower',
        styles: 'www/less',
        css: 'www/css',
        img: 'www/img',
        gfx: 'www/gfx',
        app: 'www/app',
        js: 'www/js',
        tpl: 'www/tpl',
        dist: 'dist',

        less: {
            options: {
                paths: [
                    '<%= styles %>',
                    '<%= bower %>'
                ],
                relativeUrls: true
            },
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: '<%= css %>/style.css.map',
                    sourceMapURL: 'style.css.map',
                    sourceMapBasepath: '<%= www %>',
                    outputSourceFiles: true
                },
                files: {
                    '<%= css %>/style.css': '<%= styles %>/main.less'
                }
            },
            production: {
                files: {
                    '<%= css %>/style.css': '<%= styles %>/main.less'
                }
            }
        },

        cssmin: {
            min: {
                files: {
                    '<%= css %>/style.min.css': '<%= css %>/style.css'
                }
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= gfx %>/svg',
                    src: ['*.svg'],
                    dest: '<%= gfx %>/svg-min'
                }]
            }
        },

        grunticon: {
            icons: {
                files: [{
                    expand: true,
                    cwd: '<%= gfx %>/svg-min',
                    src: ['*.svg', '*.png'],
                    dest: '<%= gfx %>/icon'
                }],
                options: {
                    enhanceSVG: true
                }
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),

                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                freeze: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                indent: 4,
                white: false,
                quotmark: 'single',
                trailing: true,
                jquery: true,
                browser: true,
                debug: false,
                devel: false,
                predef: [
                    'require',
                    'module'
                ]
            },
            gruntfile: {
                options: {
                    node: true
                },
                src: 'Gruntfile.js'
            },
            dev: {
                options: {
                    devel: true,
                    debug: true,
                    unused: false
                },
                src: [
                    '<%= app %>/**/*.js'
                ]
            },
            production: {
                src: [
                    '<%= app %>/**/*.js'
                ]
            }
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: [
                '<%= app %>/**/*.js'
            ]
        },

        browserify: {
            dev: {
                options: {
                    debug: true,
                    watch: true
                },
                files: {
                    '<%= js %>/app-compiled.js': ['<%= app %>/app.js']
                }
            },
            production: {
                files: {
                    '<%= js %>/app-compiled.js': ['<%= app %>/app.js']
                }
            }
        },

        uglify: {
            options: {
                report: 'min'
            },
            compile: {
                files: {
                    '<%= js %>/app-compiled.min.js': ['<%= js %>/app-compiled.js']
                }
            }
        },

        clean: {
            production: ['<%= dist %>'],
            build: [
                '<%= css %>/*',
                '<%= js %>/*',
                '<%= www %>/*.html'
            ]
        },

        copy: {
            options: {
                nonull: true
            },
            js: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        '<%= bower %>/respond/dest/respond.min.js',
                        '<%= bower %>/es5-shim/es5-shim.min.js',
                        '<%= bower %>/es5-shim/es5-sham.min.js'
                    ],
                    dest: '<%= js %>'
                }]
            },
            production: {
                files: [{
                    expand: true,
                    cwd: 'www',
                    src: [
                        'css/*.css',
                        'js/*.js',
                        'gfx/icon/**/*',
                        'img/**/*',
                        '*.{html,png,ico,xml,json}'
                    ],
                    dest: '<%= dist %>'
                }]
            }
        },

        assemble: {
            options: {
                pkg: '<%= pkg %>',
                flatten: true
            },
            dev: {
                options: {
                    data: '<%= tpl %>/dev/*.json',
                    partials: ['<%= tpl %>/partials/**/*.hbs'],
                    layout: '<%= tpl %>/layouts/default.hbs'
                },
                files: {
                    '<%= www %>': ['<%= tpl %>/pages/**/*.hbs']
                }
            },
            production: {
                options: {
                    data: '<%= tpl %>/production/*.json',
                    partials: ['<%= tpl %>/partials/**/*.hbs'],
                    layout: '<%= tpl %>/layouts/default.hbs'
                },
                files: {
                    '<%= www %>': ['<%= tpl %>/pages/**/*.hbs']
                }
            }
        },

        esteWatch: {
            options: {
                dirs: [
                    './',
                    '<%= styles %>/**/',
                    '<%= tpl %>/**/'
                ],
                livereload: {
                    enabled: false
                }
            },
            less: function() {
                return 'cssdev';
            },
            js: function(filepath) {
                if (filepath === 'Gruntfile.js') {
                    return 'jshint:gruntfile';
                } else if (filepath === 'www/js/app-compiled.js') {
                    return;
                } else {
                    grunt.config(['jshint', 'dev', 'src'], filepath);
                    grunt.config(['jscs', 'src'], filepath);
                    return 'jsdev';
                }
            },
            jsx: function() {
                return 'jsdev';
            },
            hbs: function() {
                return 'tpldev';
            },
            json: function() {
                return 'tpldev';
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= css %>/style.css',
                        '<%= js %>/app-compiled.js',
                        '<%= www %>/*.html'
                    ]
                },
                options: {
                    watchTask: true
                }
            }
        }
    });

    require('jit-grunt')(grunt);

    grunt.registerTask('default', ['cssdev', 'jsdev', 'tpldev', 'browserSync', 'esteWatch']);
    grunt.registerTask('cssdev', ['less:dev']);
    grunt.registerTask('css', ['less:production', 'cssmin']);
    grunt.registerTask('icon', ['svgmin', 'grunticon']);
    grunt.registerTask('jsdev', ['jshint:gruntfile', 'jshint:dev', 'jscs', 'browserify:dev']);
    grunt.registerTask('js', ['jshint:gruntfile', 'jshint:production', 'jscs', 'browserify:production', 'uglify:compile']);
    grunt.registerTask('tpldev', ['assemble:dev']);
    grunt.registerTask('tpl', ['assemble:production']);
    grunt.registerTask('dist', ['clean:production', 'copy:production']);
    grunt.registerTask('build', ['clean:build', 'css', 'copy:js', 'js', 'tpl', 'dist']);

};
