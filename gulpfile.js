var gulp = require('gulp');
var rename = require("gulp-rename");
var del = require('del');
var minifyJS = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sftp = require('gulp-sftp');

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

gulp.task('update', function () {
    return gulp.src(['./**', '!./.vscode/**', '!./node_modules/**', '!./fileupload/**', '!./.jshintrc', '!./build.cmd', '!./gulpfile.js', '!./package.json', '!./server.js', '!./start.cmd'])
        .pipe(sftp({
            host: '172.20.37.201',
            user: 'root',
            pass: 'Yshh@2017',
            remotePath: '/var/www/html/fe/e-ban/'
        }));
});

