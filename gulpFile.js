var gulp = require('gulp'),
    cssConcat = require('gulp-concat-css'),
    cssClean = require('gulp-clean-css'),
    sourcemap = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

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
        .pipe(sass())
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