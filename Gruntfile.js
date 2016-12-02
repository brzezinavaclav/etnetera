module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: {
                    'dist/js/main.min.js': ['node_modules/jquery/dist/jquery.min.js', 'node_modules/slick-carousel/slick/slick.js', 'node_modules/chart.js/dist/Chart.js', 'resources/js/main.js']
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['resources/less'],
                    compress: true
                },
                files: {
                    'dist/css/main.min.css': ['node_modules/slick-carousel/slick/slick.less', 'node_modules/slick-carousel/slick/slick-theme.less', 'resources/less/main.less']
                }
            }
        },
        watch: {
            less:{
                files: ['resources/less/*.less'],
                tasks: ['less']
            },
            js: {
                files: ['resources/js/*.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-responsive-images');

    grunt.registerTask('default', ['uglify', 'less']);

};