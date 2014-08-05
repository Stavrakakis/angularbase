var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var jshint = require('gulp-jshint');
var jsbeautify = require('gulp-jsbeautifier');

var paths = {
    scripts: ['app/js/**/*.js']
};

gulp.task('clean', function (cb) {

    del(['build'], cb);

});



gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
            .pipe(sourcemaps.init())
            .pipe(jsbeautify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
            .pipe(jshint('.jshintrc'))
            .pipe(uglify())
            .pipe(concat('all.min.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('build/js'));
});


gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});


gulp.task('default', ['watch', 'scripts']);
