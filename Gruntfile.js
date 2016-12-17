module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: {
                    'dist/js/main.min.js': ['node_modules/jquery/dist/jquery.min.js', 'resources/js/main.js'],
                    'dist/js/slick.min.js': 'node_modules/slick-carousel/slick/slick.js'
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['resources/less', 'node_modules/slick-carousel/slick'],
                    compress: true
                },
                files: {
                    'dist/css/main.min.css': 'resources/less/main.less',
                    'dist/css/slick.min.css': ['node_modules/slick-carousel/slick/slick.less', 'node_modules/slick-carousel/slick/slick-theme.less']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    'dist/css/font-awesome.min.css': ['node_modules/font-awesome/css/font-awesome.css']
                }]
            }
        },
        responsive_images: {
            myTask: {
                options: {
                    sizes: [{
                        name: 'nHD',
                        height: 360
                    },{
                        name: 'HD',
                        height: 720
                    },{
                        name: "FHD",
                        height: 1080
                    },{
                        name: "UHD",
                        height: 2160
                    }]
                },
                files: [{
                    expand: true,
                    src: ['img/**.jpg'],
                    cwd: 'resources/',
                    dest: 'dist/'
                }]
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: 'node_modules/font-awesome',
                src: 'fonts/*',
                dest: 'dist/'
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
            },
            img:{
                files: ['resources/img/*.jpg'],
                tasks: ['responsive_images']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['uglify', 'less', 'cssmin', 'responsive_images', 'copy']);

};