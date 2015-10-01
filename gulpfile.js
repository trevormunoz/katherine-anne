'use strict';

// Dependencies
var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var banner = {
  theme:
    '/* \n' +
    'Theme Name:   KAP Correspondence Child Theme \n' +
    'Theme URI: \n' +
    'Description:  Twenty Fifteen Child Theme \n' +
    'Author:       Trevor Muñoz \n' +
    'Author URI:   http://www.trevormunoz.com \n' +
    'Template:     twentyfifteen \n' +
    'Version:      0.1.0 \n' +
    'License:      MIT \n' +
    'License URI:  http://opensource.org/licenses/MIT \n' +
    'Tags:         minimal, backbonejs \n' +
    'Text Domain:  kap-twenty-fifteen-child \n' +
    '*/ \n\n'
};

gulp.task('clean', function(callback) {
  return del(['./dist', './kap-twenty-fifteen-child.zip'], callback);
});

gulp.task('build:css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', gutil.log))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(header(banner.theme))
    .pipe(gulp.dest('dist/'));
});

gulp.task('typography', function() {
  return gulp.src(['src/js/typography.js'])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build:es6', function() {
  return browserify({
    entries: './src/js/main.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('kap.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
  .pipe(sourcemaps.write('./'))
  .pipe(rename('kap.min.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('zip', function() {
  return gulp.src(['dist/**/*', 'src/**/*.php', 'src/**/*.png'])
    .pipe(zip('kap-twenty-fifteen-child.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function(callback) {
  return runSequence(
    'clean',
    ['build:css', 'typography', 'build:es6'],
    'zip',
    callback
  );
});
