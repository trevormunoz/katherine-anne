// Dependencies
const gulp = require('gulp'),
      del = require('del'),
      gutil = require('gulp-util'),
      connect = require('gulp-connect'),
      zip = require('gulp-zip'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      minifyCss = require('gulp-minify-css'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      header = require('gulp-header'),
      size = require('gulp-size'),
      runSequence = require('run-sequence');

const banner = {
  theme:
    `/*
    Theme Name:   Katherine Anne
    Theme URI:
    Description:  Katherine Anne Porter Correspondence Theme
    Author:       Trevor Muñoz <tmunoz@umd.edu>
    Author URI:   http://www.trevormunoz.com
    Template:     twentyfifteen
    Version:      0.1.0
    License:      MIT
    License URI:  http://opensource.org/licenses/MIT
    Text Domain:  katherine-anne
    */ \n\n`
};

gulp.task('clean', function(callback) {
  return del(['./dist', './katherine-anne.zip'], callback);
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
  .transform(babelify, {presets: ['es2015']})
  .bundle()
  .on('error', function (err) { gutil.log("Error : " + err.message); })
  .pipe(source('kap.js'))
  .pipe(buffer())
//  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .on('error', gutil.log)
//  .pipe(sourcemaps.write('./'))
  .pipe(rename('kap.min.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('zip', function() {
  return gulp.src(['dist/**/*', 'src/**/*.php', 'src/**/*.png'])
    .pipe(zip('katherine-anne.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('styles-only', function(callback) {
  return runSequence(
    ['build:css', 'typography'],
    'zip',
    callback
  );
});

gulp.task('default', function(callback) {
  return runSequence(
    'clean',
    ['build:css', 'typography', 'build:es6'],
    'zip',
    callback
  );
});
