/* eslint-env node */

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify');

gulp.task('css', function() {
	return gulp.src('./src/*.css')
	.pipe(gulp.dest('dist'))
	.pipe(rename('codeground.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', ['lint'], function() {
    return gulp.src('./src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(rename('Codeground.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
	return gulp.src(['**/*.js','!node_modules/**', '!dist/**/*'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('build', ['css', 'js']);

gulp.task('watch', ['build'], function() {
    gulp.watch('./src/**/*.css', ['css']);
	gulp.watch('./src/**/*.js', ['js']);
});
