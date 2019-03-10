var gulp = require('gulp')
var cp = require('child_process')
var electron = require('electron')

const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const {appConfig, desktopConfig} = require('./webpack.config')

var newer = require('gulp-newer')
var livereload = require('gulp-livereload')

var DIST_DIR = "dist"

gulp.task('webpack:app', function() {
  return gulp.src("src/client/main.tsx")
  .pipe(webpackStream(appConfig, webpack))
    .pipe(gulp.dest('dist/client'))
})

gulp.task('bundle:desktop', function() {
  return gulp.src("src/desktop/main.ts")
  .pipe(webpackStream(desktopConfig, webpack))
    .pipe(gulp.dest('dist/desktop'))
})

gulp.task('bundle', gulp.parallel('webpack:app', 'bundle:desktop'))

gulp.task('run-electron', async function() {
    cp.spawn(electron, ["."], { stdio: "inherit" })
      .on("close", () => process.exit(0))
})


gulp.task('watch', async function() {
  livereload.listen();
  gulp.watch('src/client/**/*.{ts,tsx}', gulp.series('webpack:app'))
  //gulp.watch(paths.html.src, gulp.series('copy-assets'))
  //gulp.watch(paths.styles.src, gulp.series('copy-css'))
})


var build = gulp.tree().nodes

gulp.task('default', gulp.series(build))

//var rimraf = require('rimraf');
// gulp.task('clean', function (cb) {
//    rimraf('./dist', cb);
// });