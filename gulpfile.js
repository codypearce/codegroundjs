var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
