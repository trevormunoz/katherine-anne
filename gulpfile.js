// Dependencies
const gulp = require('gulp'),
      del = require('del'),
      gutil = require('gulp-util'),
      zip = require('gulp-zip'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      nano = require('gulp-cssnano'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
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

const libs = [
  'backbone',
  'underscore',
  'handlebars',
  'elasticsearch',
  'd3-request',
  'd3'
];

gulp.task('clean:build', function(callback) {
  return del(['./dist'], callback);
});

gulp.task('clean:zip', function(callback) {
  return del(['./katherine-anne.zip'], callback);
});

gulp.task('copy', function() {
  return gulp.src(['src/**/*.php', 'src/**/*.png'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', function(err) {
      gutil.log('Error: ' + err.message);
      this.emit('end');
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .on('error', function(err) {
      gutil.log("Error : " + err.message);
      this.emit('end');
    })
    .pipe(header(banner.theme))
    .pipe(size({'showFiles': true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:js', function() {
  return gulp.src(['node_modules/bootstrap/js/dist/util.js',
                   'node_modules/bootstrap/js/dist/modal.js',
                   'src/js/utils/interactive-styles.js',
                   'src/js/utils/typography.js'])
    .pipe(concat('site.js'))
    .pipe(uglify({ mangle: false }))
    .on('error', function(err) {
      gutil.log("Error : " + err.message);
      this.emit('end');
    })
    .pipe(rename('site.min.js'))
    .pipe(size({'showFiles': true}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build:es6', ['app', 'vendor']);

gulp.task('app', function() {
  return browserify({
    entries: './src/js/main.js',
    debug: true
  })
  .external(libs)
  .transform(babelify, {presets: ['es2015']})
  .bundle()
  .on('error', function (err) {
    gutil.log("Error : " + err.message);
    this.emit('end');
  })
  .pipe(source('kap.js'))
  .pipe(buffer())
  .pipe(uglify({ mangle: false }))
  .on('error', function (err) {
    gutil.log("Error : " + err.message);
    this.emit('end');
  })
  .pipe(rename('kap.min.js'))
  .pipe(size({'showFiles': true}))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor', function() {
  return browserify({
      debug: false
    })
    .require(libs)
    .bundle()
      .on('error', function (err) {
        gutil.log("Error : " + err.message);
        this.emit('end');
      })
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(uglify({ mangle: false }))
    .on('error', function (err) {
      gutil.log("Error : " + err.message);
      this.emit('end');
    })
    .pipe(rename('vendor.min.js'))
    .pipe(size({'showFiles': true}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['app']);
  gulp.watch('src/scss/**/*.scss', ['build:css']);
});

gulp.task('distribute', function() {
  return gulp.src(['dist/**/*', 'src/**/*.php', 'src/**/*.png'])
    .pipe(zip('katherine-anne.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function(callback) {
  return runSequence(
    'clean:build',
    ['build:css', 'build:js'],
    callback
  );
});

gulp.task('default', function(callback) {
  return runSequence(
    'clean:build',
    'copy',
    ['build:css', 'build:js', 'build:es6'],
    callback
  );
});

gulp.task('run', ['default', 'watch']);
