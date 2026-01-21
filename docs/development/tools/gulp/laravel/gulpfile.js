const gulp = require('gulp'),
  // Gulp functions
  rename = require('gulp-rename'), // Rename files
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
  // javascript
  rollup = require('rollup'), // Compile js with imports
  { nodeResolve } = require('@rollup/plugin-node-resolve'),
  { babel } = require('@rollup/plugin-babel'), // Cross browsers js
  { uglify } = require('rollup-plugin-uglify'), // Minify js

  //URL LOCALE
  url = 'http://local.cyourproject.com/',
  // NOM DE VOTRE THEME ENFANT WP
  assetsPath = './resources',
  //CHEMIN VERS VOTRE THEME ENFANT WP
  distPath = './public';


/**
 * Gulp lint scss with SMACSS standard
 */
gulp.task('lint-scss', shell.task(`npx stylelint "${assetsPath}/assets/sass/**/*.scss"`));
gulp.task('fix-lint-scss', shell.task(`npx stylelint --fix "${assetsPath}/assets/sass/**/*.scss"`));


/**
 * Prettify scss & js files
 */
gulp.task('prettier', () => {
  return gulp
    .src([`${assetsPath}/assets/js/**/*.js`, `${assetsPath}/assets/scss/**/*.scss`])
    .pipe(prettier('.prettierrc'))
    .pipe(gulp.dest((file) => file.base));
});


/**
 * Compile scss
 */
gulp.task('styles', () => {
  return gulp
    .src(`${assetsPath}/sass/main.scss`)
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
    // .pipe(gcmq())
    .pipe(sourcemaps.write(`/`))
    .pipe(gulp.dest(`${distPath}/css/`))
    .pipe(browserSync.stream()); // Inject Styles when scss is compiled
});


/**
 * Minify compiled css
 */
gulp.task('minify', () => {
  return gulp
    .src(`${distPath}/css/**/!(*.min)*.css`)
    .pipe(minifycss({ maxLineLen: 80 }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest((file) => file.base));
});


/**
 * Compile & Babelyse js files
 */
gulp.task('scripts', async function () {
  const bundle = await rollup.rollup({
    input: `${assetsPath}/js/scripts.js`,
  });
  await bundle.write({
    file: `${distPath}/js/scripts.umd.js`,
    format: 'umd',
    name: 'map',
    sourcemap: true,
  });

  const bundleBabelized = await rollup.rollup({
    input: `${assetsPath}/js/scripts.js`,
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'bundled' }),
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
    file: `${distPath}/js/scripts.umd.ba.js`,
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
    .src(`${assetsPath}/views/**/*.php`)
    .pipe(replace(/\bvar_dump\(([^)]+)\);/g, ''))
    .pipe(gulp.dest((file) => file.base));
});


/**
 * Watch and compile scss & js
 */
gulp.task('watch', () => {
  gulp.watch(`${assetsPath}/scss/**/*.scss`, gulp.series('styles'));
  gulp.watch(`${assetsPath}/js/**/*.js`, gulp.series('scripts'));
});


/**
 * Start local Server & compile sass with browserSync
 */
gulp.task('dev', () => {
  browserSync.init({
    proxy: url,
    injectChanges: true,
  });
  gulp.watch(`${assetsPath}/scss/**/*.scss`, gulp.series('styles'));
  gulp.watch(`${assetsPath}/js/**/*.js`, gulp.series('scripts'));
});


/**
 * Clean Build before commiting
 */
gulp.task('build', (done) => {
  runSequence(
    'prettier',
    'fix-lint-scss',
    'prettier',
    'styles',
    'minify',
    'scripts',
    'clean-php',
    () => {
      console.log('( •̀ ω •́ )✧');
      done();
    });
});
