var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src('./src/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
