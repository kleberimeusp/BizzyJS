module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        concat: {

            js: {

                files: [

                    { src: ["src/bizzy.js", "src/utils/*.js", "src/mediator.js", "src/model.js", "src/view.js"], dest: "build/bizzy.js" }

                ]

            }

        },

        jshint: {

            ignore_warning: {

                options: {

                },

                src: ["src/**/*.js"],

            },

        },

        uglify: {

            options: {

                mangle: false

            },

            my_target: {

                files: [

                    { src: "build/bizzy.js", dest: "build/bizzy.min.js" }

                ]

            }

        },

        watch: {

            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]

        },

        yuidoc: {

            compile: {

                name: "<%= pkg.name %>",
                description: "<%= pkg.description %>",
                version: "<%= pkg.version %>",
                url: "",
                options: {

                    paths: "src/",
                    outdir: "doc/"

                }

            }

        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");

    grunt.registerTask("default", ["jshint", "concat", "uglify", "yuidoc"]);

};
