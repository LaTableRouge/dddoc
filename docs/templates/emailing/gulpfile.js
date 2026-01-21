const gulp = require(`gulp`);
const zip = require(`gulp-zip`);

const path = `./test`;
const zipname = `zipname`;

/**
 * Zip folder
 */
gulp.task(`zip`, () => {
  return gulp
    .src(`${path}/**`)
    .pipe(zip(`${zipname}.zip`))
    .pipe(gulp.dest(`${path}`));
});

/**
 * Watch and compile scss & js
 */
gulp.task(`watch`, () => {
  gulp.watch(`${path}/**/*.html`, gulp.series(`zip`));
});
