'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
    maps = require('gulp-sourcemaps');

gulp.task('compileSass', function() {
  return gulp.src("scss/main.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
    gulp.watch('scss/**/*{.scss,.sass}', ['compileSass'])
});

gulp.task('default', ['watch']);
