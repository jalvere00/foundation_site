var gulp = require('gulp'),
    cssConcat = require('gulp-concat-css'),
    cssClean = require('gulp-clean-css'),
    sourcemap = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon');

var port = 8080;
var syncPort = 8081;

gulp.task('nodemon', function(cb){
    var called = false;
    return nodemon({
        script:'app.js',
        env:{
            'PORT':port
        },
        watch:['view', 'public', 'app.js']
    }).on('start', function(){
        if(!called){
            cb();
            called = true;
        }
    })
})

gulp.task('browser-sync', ['nodemon'], function(){
    browserSync.init({
        proxy:"localhost:"+port.toString(),
        files: ["public/**/*.*", "app.js"],
        // browser: "google chrome",
        port: syncPort,
    })
})

gulp.task("css", function(){
    gulp.src('build/css/style.css')
        .pipe(sourcemap.init())
        .pipe(cssClean({
                compatibility: "ie8", 
                keepSpecialComments : 0,
                target: "Resources",
                relativeTo: ""
            })
        )
        .pipe(cssConcat("style.min.css", {newLine:""}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemap.write())
        .pipe(gulp.dest("public/css"))
})

gulp.task("sass", function(){
    gulp.src('build/sass/style.scss')
        .pipe(sourcemap.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(cssClean({
                compatibility: "ie8", 
                keepSpecialComments : 0,
                target: "Resources",
                relativeTo: ""
            })
        )
        .pipe(cssConcat("sass.min.css", {newLine:""}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemap.write())
        .pipe(gulp.dest("public/css"))
})

gulp.task('watch', function(){
    gulp.watch('build/sass/**/*', ['sass']);
    gulp.watch('view/**/*', ['sass'])
})

gulp.task('dev', ['browser-sync', 'sass', 'watch'])