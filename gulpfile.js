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

gulp.task('styles', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dest/'));
});

gulp.task('typography', function() {
  gulp.src(['bower_components/Lettering.js/jquery.lettering.js', 'src/js/typography.js'])
    .pipe(concat('typography.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'));
});

gulp.task('modernizr', function() {
  gulp.src('bower_components/modernizr/modernizr.js')
    .pipe(uglify())
    .pipe(gulp.dest('dest/js/libs/'));
});

gulp.task('make_theme', function() {
  gulp.src('dest/style.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(header(banner.theme))
    .pipe(gulp.dest('dest/'));
});

gulp.task('copy_files', function() {
  gulp.src('src/**/*.php')
    .pipe(gulp.dest('dest/'));
});

gulp.task('default', ['styles', 'make_theme', 'typography', 'modernizr', 'copy_files'], function() {});
