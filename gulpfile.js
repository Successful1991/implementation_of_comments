const gulp = require('gulp');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// --server-- //
gulp.task('server', () => {
  gulp.src('')
    .pipe(server({
      livereload: true,
      open: true,
    }));
});


// --compiler-- //
gulp.task('sass', () => {
  return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 6 versions'],
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', () => {
  gulp.watch('app/sass/*.scss', ['sass']);
});

gulp.task('default', ['server', 'watch']);

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
});
