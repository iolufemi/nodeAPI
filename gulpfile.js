"use strict";
var gulp = require('gulp');
var jsHint = require('gulp-jshint');
var jsHintStyle = require('jshint-stylish');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('default', ['lint','test','serve']);

gulp.task('pre-test', function () {
  return gulp.src(['lib/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

// Run unit tests
gulp.task('test', ['pre-test'], function () {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

// jsHint 
gulp.task('lint', function(){
  return gulp.src(['*.js','**/*.js','**/**/*.js'])
  .pipe(jsHint())
  .pipe(jsHint.reporter(jsHintStyle));
});

// Start the server on development
gulp.task('serve', function () {
  nodemon({ script: 'app.js', tasks: ['lint'] })
  .on('restart', function () {
    console.log('restarted!!!');
  });
});
