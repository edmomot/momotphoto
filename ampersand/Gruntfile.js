module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        availabletasks: {           // task
            tasks: {}               // target
        },

        browserify: {
            specs: {
                src: ["test/cases/*.js"],
                dest: "test/build/specs.js",
                options: {
                    debug: true,
                    paths: ["./node_modules"]
                }
            }
        },

        jasmine: {
            dev: {
                src: [],
                options: {
                    specs: "test/build/specs.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['availabletasks']);
    grunt.registerTask('test', ['browserify', 'jasmine']);
};