var path = require('path');
var gulp = require('gulp');
//var gutil = require('gulp-util');

var Builder = require('systemjs-builder');

var watch = require('gulp-watch');
var shell = require('gulp-shell');
var exec = require('gulp-exec');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var cssmin = require('gulp-cssmin');


var ts = require('gulp-typescript');
var merge = require('merge2');

var jshint = require('gulp-jshint');


//var runSequence = require('gulp-run-sequence');
//var save = require('gulp-save');
//var clean = require('gulp-clean');
//var gulpFilter = require('gulp-filter');

// var ngAnnotate = require('gulp-ng-annotate');
// var ngmin = require('gulp-ngmin');
//var babel = require('gulp-babel');

 
var builder = new Builder();

gulp.task('sass',function(){
   return gulp.src('src/style/css/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/style/css/'))
});

gulp.task('ts', function() {
    var tsResult = gulp.src('src/app/**/*.ts').pipe(ts());
 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.  
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('src/app'))
    ]);
});





gulp.task('bundle:css',['sass'],function(){
    return gulp.src('src/style/css/**/*.css')
        .pipe(cssmin())
        .pipe(concat('baseStyle.bundle.css'))
        .pipe(gulp.dest('src/style/'))
});


gulp.task('bundle:js',['ts'], function () {
  
  builder.loadConfig('config.js').then(function() {
    //builder.buildSFX('systemBuild/app', 'dist/app.js',{  config: { baseURL: 'file:' + path.resolve() }}).then(function() {
    builder.buildSFX('src/app/app', 'src/app/app.bundle.js',{ sourceMaps: true, minify: false, config: { baseURL: 'file:' + path.resolve() }}).then(function() {
      console.log('Build complete');
    }).catch(function(err) {
      console.log('Build error');
      console.log(err);
    });
  });
});

gulp.task('run',['serve','browse']);

gulp.task('browse',shell.task([
  'start chrome "http://localhost:3000/index.html"'
]))

gulp.task('serve', shell.task([
  'start cmd /k serve',
]))

gulp.task('watch', function() {
  gulp.watch('src/style/css/**/*.scss', ['sass']);
  gulp.watch('src/app/**/*.ts', ['ts']);
});

gulp.task('lint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(jshint({ esnext : true}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

//var util = require('util');
//console.log(util.inspect(exec1, {showHidden: false, depth: null}));
