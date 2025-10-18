
"use strict";
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: "dist/**"
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ["src/fonts/*"],
                        dest: "dist/fonts",
                        filter: "isFile"
                    }
                ]
            }
        },
        cssmin: {
            options: {
                banner: "'/*! <%= pkg.name %> - v<%= pkg.version %> */'",
                compatibility: "ie8",
                report: "gzip",
                level: {
                    1: {
                        all: true
                    },
                    2: {
                        all: true
                    }
                }
            },
            dist: {
                expand: true,
                cwd: "dist",
                src: ["css/*.css"],
                dest: "dist"
            }
        },
        less: {
            dist : {
                options: {
                    compress: true,
                    modifyVars:{
                        cdnPath: "'<%= pkg.cdn %>@<%= pkg.version %>'",
                        version: "'<%= pkg.version %>'"
                    },
                    paths: ["dist/css"]
                },
                files: {
                    "dist/css/<%= pkg.name %>.css": "src/less/index.less"
                }
            }
        },


    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");

    grunt.registerTask("default", ["clean", "copy", "less", "cssmin"]);
};