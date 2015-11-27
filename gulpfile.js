var gulp = require('gulp'),
    // bower = require('bower'),
    // concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    // minifyCss = require('gulp-minify-css'),
    // rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    copy = require('gulp-copy'),
    del = require('del'),
    inject = require('gulp-inject');

var paths = {
  sass: ['./src/scss/**/*.scss'],
  js: ['./src/**/*.js'],
  html: ['./src/**/*.html'],
  all: ['./src/scss/**/*.scss', './src/**/*.js', './src/**/*.html']
};

gulp.task('default', ['inject']);

gulp.task('sass', ['clean-css'], function(done) {
  gulp.src(paths.sass)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./dist/css/'))
    // .pipe(minifyCss({
      // keepSpecialComments: 0
    // }))
    // .pipe(rename({ extname: '.min.css' }))
    // .pipe(gulp.dest('./dist/css/'))
    .on('end', done);
});

gulp.task('jshint', ['babel'], function() {
  gulp.src(['./dist/**/*.js', '!./dist/lib', '!./dist/lib/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('babel', ['clean-js'], function() {
  gulp.src(paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copyHtmlImg', ['clean-html'], function() {
  return gulp.src(['./src/**/*.html', './src/img', './src/img/**/*'])
    .pipe(copy('./dist', { prefix: 1 }));
});

gulp.task('clean-js', function(cb) {
  del(['./dist/**/*.js', '!./dist/lib', '!./dist/lib/**/*.js']).then(function(delPaths) {
    console.log('Deleted js files and folders:\n', delPaths.join('\n'), '\n');
    cb();
  });
});

gulp.task('clean-html', function(cb) {
  del(['./dist/**/*.html', '!./dist/lib', '!./dist/lib/**/*.html']).then(function(delPaths) {
    console.log('Deleted html files and folders:\n', delPaths.join('\n'), '\n');
    cb();
  });
});

gulp.task('clean-css', function(cb) {
  del(['./dist/css/**/*.css', './dist/css']).then(function(delPaths) {
    console.log('Deleted css files and folders:\n', delPaths.join('\n'), '\n');
    cb();
  });
});

gulp.task('inject', ['sass', 'jshint', 'copyHtmlImg'], function() {
  return gulp.src('./dist/index.html')
    .pipe(inject(
      gulp.src(['./dist/**/*.js', '!./dist/lib/**/*.js', './dist/css/**/*.css'], {read: false}),
      {relative: true}
    ))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['inject'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['jshint']);
  gulp.watch(paths.html, ['copyHtmlImg']);
  gulp.watch(paths.all, ['inject']);
});