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

gulp.task('clean:build', function(callback) {
  return del(['./dist'], callback);
});

gulp.task('clean:zip', function(callback) {
  return del(['./katherine-anne.zip'], callback);
});

gulp.task('copy', function(callback) {
  return gulp.src(['src/**/*.php', 'src/**/*.png'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', function(err) {
      gutil.log('Error: ' + err.message);
      this.emit('end');
    }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .on('error', function(err) {
      gutil.log("Error : " + err.message);
      this.emit('end');
    })
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
//  .pipe(sourcemaps.write('./'))
  .on('error', function (err) { gutil.log("Error : " + err.message); })
  .pipe(rename('kap.min.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('distribute', function() {
  return gulp.src(['dist/**/*', 'src/**/*.php', 'src/**/*.png'])
    .pipe(zip('katherine-anne.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('styles-only', function(callback) {
  return runSequence(
    'clean:build',
    ['build:css', 'typography'],
    callback
  );
});

gulp.task('default', function(callback) {
  return runSequence(
    'clean:build',
    'copy',
    ['build:css', 'typography', 'build:es6'],
    callback
  );
});
