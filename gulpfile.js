const gulp = require('gulp');
const less = require('gulp-less');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const autoprefix = new LessPluginAutoPrefix();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const gutil = require('gulp-util');

gulp.task('javascripts', () => gulp.src([
  './public/src/js/*.js'
])
.pipe(babel({
  presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017"].map(require.resolve)
}))
.pipe(uglify())
.pipe(gulp.dest('./public/dist/assets/js')));

gulp.task('stylesheets', () => gulp.src([
  './public/src/css/*.less'
])
.pipe(less({
  plugins: [autoprefix]
}).on('error', gutil.log))
.pipe(cleanCSS())
.pipe(gulp.dest('./public/dist/assets/css')));

gulp.task('images', () => gulp.src([
  './public/src/img/*'
])
.pipe(image())
.pipe(gulp.dest('./public/dist/assets/img')));

gulp.task('default', () => {
  gulp.run('javascripts');
  gulp.run('stylesheets');

  gulp.watch([
    './public/src/js/*.js'
  ], ['javascripts']);
  gulp.watch([
    './public/src/css/*.less'
  ], ['stylesheets']);
});