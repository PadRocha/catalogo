
module.exports = function (grunt) {
    grunt.initConfig({

        // define source files and their destinations
        uglify: {
            options: {

            },
            main: {
                files: [{
                    expand: true,
                    src: ['dist/**/*.js'],
                    dest: ''
                }]
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    // register at least this one task
    grunt.registerTask('default', ['uglify']);



};