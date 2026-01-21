const gulp = require('gulp'),
  // Gulp functions
  plumber = require('gulp-plumber'), // Helps prevent stream crashing on errors
  rename = require('gulp-rename'), // Rename files
  nop = require('gulp-nop'), //«No operation». Useful when you want primitive conditional execution in a long pipeline
  sourcemaps = require('gulp-sourcemaps'), // Create sourcemap files
  browserSync = require('browser-sync').create(), // Browser sync
  runSequence = require('gulp4-run-sequence'), // Launch sequence of actions
  replace = require('gulp-replace'), // Replace string
  // scss
  sass = require('gulp-sass'),
  prettier = require('gulp-prettier'), // Prettier for scss files
  autoprefixer = require('gulp-autoprefixer'), // Cross browsers css
  gcmq = require('gulp-group-css-media-queries'), // Group MediaQueries
  shell = require('gulp-shell'), // Run Shell commands with Gulp
  // css
  minifycss = require('gulp-uglifycss'), // Minify css
  uncss = require('gulp-uncss'), // Remove unused classes
  // javascript
  //babel = require('gulp-babel'), // Cross browsers js
  stripDebug = require('gulp-strip-debug'), // Remove console log & alerts from compiled js
  strip = require('gulp-strip-comments'), // Remove comments from compiled js
  //uglify = require('gulp-uglify'), // Minify js
  rollup = require('rollup'), // Compile js with imports
  {nodeResolve} = require('@rollup/plugin-node-resolve'),
  {babel} = require('@rollup/plugin-babel'), // Cross browsers js
  {uglify} = require('rollup-plugin-uglify'), // Minify js

  //URL LOCALE
  url = 'http://local.cyourproject.com/',
  // NOM DE VOTRE THEME ENFANT WP
  themename = 'yourtheme',
  //CHEMIN VERS VOTRE THEME ENFANT WP
  themepath = `./wp-content/themes/${themename}`;


/**
 * Gulp lint scss with SMACSS standard
 */
gulp.task('lint-scss', shell.task(`npx stylelint "${themepath}/assets/scss/**/*.scss"`));
gulp.task('fix-lint-scss', shell.task(`npx stylelint --fix "${themepath}/assets/scss/**/*.scss"`));


/**
 * Prettify scss & js files
 */
gulp.task(`prettier`, () => {
  return gulp
    .src([`${themepath}/assets/js/*.js`, `!${themepath}/assets/js/dist/**/*.js`, `${themepath}/assets/scss/**/*.scss`])
    .pipe(prettier('.prettierrc'))
    .pipe(gulp.dest((file) => file.base));
});


/**
 * Compile scss
 */
gulp.task(`styles-front`, () => {
  return gulp
    .src(`${themepath}/assets/scss/style.scss`)
    .pipe(sourcemaps.init({}))
    .pipe(
      sass({
        //Sass error display
        errLogToConsole: true,
        outputStyle: 'compact',
        precision: 10,
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: [`last 4 versions`],
      })
    )
    .pipe(gcmq())
    .pipe(sourcemaps.write(`/`))
    .pipe(gulp.dest(`${themepath}/assets/css/front/`))
    .pipe(browserSync.stream()); // Inject Styles when scss is compiled
});


/**
 * Compile admin css
 */
gulp.task(`style-editor`, () => {
  return gulp
    .src(`${themepath}/assets/scss/style-editor.scss`)
    .pipe(sourcemaps.init({}))
    .pipe(
      sass({
        //Sass error display
        errLogToConsole: true,
        outputStyle: 'compact',
        precision: 10,
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: [`last 4 versions`],
      })
    )
    .pipe(gcmq())
    .pipe(sourcemaps.write(`/`))
    .pipe(gulp.dest(`${themepath}/assets/css/back/`))
    .pipe(browserSync.stream()); // Inject Styles when scss is compiled
});

gulp.task(`styles`, (done) => {
  runSequence(`styles-front`, `style-editor`, () => {
    done();
  });
});


/**
 * Minify compiled css
 */
gulp.task(`minify-front-css`, () => {
  return gulp
    .src(`${themepath}/assets/css/front/!(*.min)*.css`)
    .pipe(minifycss({maxLineLen: 80}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(`${themepath}/assets/css/front/`));
});

gulp.task(`minify-back-css`, () => {
  return gulp
    .src(`${themepath}/assets/css/back/!(*.min)*.css`)
    .pipe(minifycss({maxLineLen: 80}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(`${themepath}/assets/css/back/`));
});

gulp.task(`minify`, (done) => {
  runSequence(`minify-front-css`, `minify-back-css`, () => {
    done();
  });
});


/**
 * Compile & Babelyse js files
 */
gulp.task(`scripts`, async function () {
  const bundle = await rollup.rollup({
    input: `${themepath}/assets/js/scripts.js`,
  });
  await bundle.write({
    file: `${themepath}/assets/js/dist/scripts.umd.js`,
    format: 'umd',
    name: 'map',
    sourcemap: true,
  });

  const bundleBabelized = await rollup.rollup({
    input: `${themepath}/assets/js/scripts.js`,
    plugins: [
      nodeResolve(),
      babel({babelHelpers: 'bundled'}),
      uglify({
        compress: {
          pure_funcs: [
            'console.log',
            // 'console.error',
            // 'console.warn',
            // ...
          ],
        },
        // Make sure symbols under `pure_funcs`,
        // are also under `mangle.reserved` to avoid mangling.
        mangle: {
          reserved: [
            'console.log',
            '__',
            // 'console.error',
            // 'console.warn',
            // ...
          ],
        },
      }),
    ],
  });
  await bundleBabelized.write({
    file: `${themepath}/assets/js/dist/scripts.umd.ba.js`,
    format: 'umd',
    name: 'map',
    sourcemap: true,
  });
});


gulp.task(`scripts-admin`, async function () {
  const bundle = await rollup.rollup({
    input: `${themepath}/assets/js/scripts-admin.js`,
  });
  await bundle.write({
    file: `${themepath}/assets/js/dist/scripts-admin.umd.js`,
    format: 'umd',
    name: 'map',
    sourcemap: true,
  });

  const bundleBabelized = await rollup.rollup({
    input: `${themepath}/assets/js/scripts-admin.js`,
    plugins: [
      nodeResolve(),
      babel({babelHelpers: 'bundled'}),
      uglify({
        compress: {
          pure_funcs: [
            'console.log',
            // 'console.error',
            // 'console.warn',
            // ...
          ],
        },
        // Make sure symbols under `pure_funcs`,
        // are also under `mangle.reserved` to avoid mangling.
        mangle: {
          reserved: [
            'console.log',
            '__',
            // 'console.error',
            // 'console.warn',
            // ...
          ],
        },
      }),
    ],
  });
  await bundleBabelized.write({
    file: `${themepath}/assets/js/dist/scripts-admin.umd.ba.js`,
    format: 'umd',
    name: 'map',
    sourcemap: true,
  });
});


/**
 * Clean php files (remove var_dump)
 */
gulp.task('clean-php', () => {
  return gulp
    .src(`${themepath}/**/*.php`)
    .pipe(replace(/\bvar_dump\(([^)]+)\);/g, ''))
    .pipe(gulp.dest((file) => file.base));
});


/**
 * Watch and compile scss & js
 */
gulp.task(`watch`, () => {
  gulp.watch(`${themepath}/assets/scss/**/*.scss`, gulp.series(`styles-front`));
  gulp.watch(`${themepath}/assets/scss/**/*.scss`, gulp.series(`style-editor`));
  gulp.watch([`${themepath}/assets/js/**/*.js`, `!${themepath}/assets/js/dist/**/*.js`], gulp.series(`scripts`));
  gulp.watch([`${themepath}/assets/js/**/*.js`, `!${themepath}/assets/js/dist/**/*.js`], gulp.series(`scripts-admin`));
});


/**
 * Start local Server & compile sass with browserSync
 */
gulp.task(`dev`, () => {
  browserSync.init({
    proxy: url,
    injectChanges: true,
  });
  gulp.watch(`${themepath}/assets/scss/**/*.scss`, gulp.series(`styles-front`));
  gulp.watch(`${themepath}/assets/scss/**/*.scss`, gulp.series(`style-editor`));
  gulp.watch([`${themepath}/assets/js/**/*.js`, `!${themepath}/assets/js/dist/**/*.js`], gulp.series(`scripts`));
  gulp.watch([`${themepath}/assets/js/**/*.js`, `!${themepath}/assets/js/dist/**/*.js`], gulp.series(`scripts-admin`));
});


/**
 * Clean Build before commiting
 */
gulp.task(`build`, (done) => {
  runSequence(`prettier`, `fix-lint-scss`, `prettier`, `styles`, `minify`, `scripts`, `scripts-admin`, `clean-php`, () => {
    console.log(`( •̀ ω •́ )✧`);
    done();
  });
});
