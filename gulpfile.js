var gulp = require('gulp'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src('./src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
