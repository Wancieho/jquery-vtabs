var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');
var header = require('gulp-header');
var license = '/*\n' +
		' * Project: vTabs\n' +
		' * Description: Simplistic and unstyled tabs\n' +
		' * Author: https://github.com/Wancieho\n' +
		' * License: MIT\n' +
		' * Version: 0.3.0\n' +
		' * Dependancies: jquery-1.*\n' +
		' * Date: 21/06/2016\n' +
		' */\n';

gulp.task('default', [
	'copy',
	'minify'
]);

gulp.task('copy', function () {
	return gulp.src('source/jquery.vtabs.js')
			.pipe(strip())
			.pipe(header(license))
			.pipe(gulp.dest('dist'));
});

gulp.task('minify', function () {
	return gulp.src('source/jquery.vtabs.js')
			.pipe(uglify())
			.pipe(header(license))
			.pipe(rename('jquery.vtabs.min.js'))
			.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch('source/jquery.vtabs.js', ['copy']);
	gulp.watch('source/jquery.vtabs.js', ['minify']);
});