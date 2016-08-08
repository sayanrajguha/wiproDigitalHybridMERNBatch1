/*************************
Config file for Gulp
**************************/
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify',function(){
    browserify('./public/js/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/js')) //we don't need to create this folder gulp will auto create this
});

//Then we create copy task

gulp.task('copy',function(){
    gulp.src('public/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('public/css/*.*')
        .pipe(gulp.dest('dist/css'));
    gulp.src('public/css/images/*.*')
        .pipe(gulp.dest('dist/css/images'));
    gulp.src('public/global-scripts/*.*')
        .pipe(gulp.dest('dist/global-scripts'));
    gulp.src('public/global-config/*.*')
        .pipe(gulp.dest('dist/global-config'));
    gulp.src('public/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));
    gulp.src('public/images/*.*')
        .pipe(gulp.dest('dist/images'));
    gulp.src('public/images-poster/*.*')
        .pipe(gulp.dest('dist/images-poster'));
});

gulp.task('default',['browserify','copy'],function(){
    return gulp.watch('public/**/*.*',['browserify','copy']);
});
