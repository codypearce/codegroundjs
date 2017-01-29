/* eslint-env node */

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify');

gulp.task('js', ['lint'], function() {
    return gulp.src('./src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(rename('codeground.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
	return gulp.src(['**/*.js','!node_modules/**', '!dist/**/*'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('build', ['js']);
