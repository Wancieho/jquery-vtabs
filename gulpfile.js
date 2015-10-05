var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', [
	'copy',
	'minify'
]);

gulp.task('copy', function () {
	return gulp.src('source/jquery.vtabs.js')
			.pipe(gulp.dest('dist'));
});

gulp.task('minify', function () {
	return gulp.src('source/jquery.vtabs.js')
			.pipe(uglify())
			.pipe(rename('jquery.vtabs.min.js'))
			.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch('source/jquery.vtabs.js', ['copy']);
	gulp.watch('source/jquery.vtabs.js', ['minify']);
});