"use strict";
var gulp = require('gulp');
var jsHint = require('gulp-jshint');
var jsHintStyle = require('jshint-stylish');
var nodemon = require('gulp-nodemon');

gulp.task('default',function(){
  // Start Here
  
});

gulp.task('lint', function(){
  return gulp.src(['*.js','**/*.js','**/**/*.js'])
  .pipe(jsHint())
  .pipe(jsHint.reporter(jsHintStyle));
});

gulp.task('serve', function () {
  nodemon({ script: 'app.js', tasks: ['lint'] })
  .on('restart', function () {
    console.log('restarted!!!');
  });
});
