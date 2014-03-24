module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        concat: {

            js: {

                files: [

                    { src: ["static/_config.js", "static/util/*.js", "static/model.js", "static/view.js"], dest: "public/bizzy.js" }

                ]

            }

        },

        jshint: {

            files: ["static/**/*.js"]

        },

        uglify: {

            options: {

                mangle: false

            },

            my_target: {

                files: [

                    { src: "public/bizzy.js", dest: "public/bizzy.min.js" }

                ]

            }

        },

        watch: {

            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]

        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["jshint", "concat", "uglify"]);

};