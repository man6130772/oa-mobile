var gulp = require('gulp'),
    rename = require("gulp-rename"),
    del = require('del'),
    minifyJS = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css');

gulp.task('compress', function() {
  del.sync(['./resources/**/*.min.js', './resources/**/*.min.css']);

  gulp.src('./resources/**/*.js')
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifyJS())
  .pipe(gulp.dest('resources'));

  gulp.src('./resources/**/*.css')
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifyCSS())
  .pipe(gulp.dest('resources'));
});
