var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');

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

gulp.task('default', function() {

});

gulp.task('styles', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dest/'));
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
