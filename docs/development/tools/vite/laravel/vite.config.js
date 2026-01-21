import autoprefixer from 'autoprefixer'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'
const { resolve } = require('path')

const chore = process.env.npm_config_chore
const isProduction = process.env.NODE_ENV === 'production'

/*
 |--------------------------------------------------------------------------
 | Config
 |--------------------------------------------------------------------------
 |
 | Assets path
 | Destination path
 | Configs path
 |
 */
const assetsPath = 'resources'
const distPath = 'public/build'

/*
 |--------------------------------------------------------------------------
 | Assets Config
 |--------------------------------------------------------------------------
 | JS = [
 |    {
 |     - File name
 |     - File input
 |    }
 |  ]
 |
 | SCSS = [
 |    {
 |     - File name
 |     - File input
 |    }
 |  ]
 |
 */
const assetsFiles = [
  {
    scripts: [
      {
        name: 'scripts',
        input: `${assetsPath}/js`
      }
    ],
    styles: [
      {
        name: 'styles',
        input: `${assetsPath}/scss`
      }
    ]
  }
]

/*
 |--------------------------------------------------------------------------
 | Watcher config
 |--------------------------------------------------------------------------
 | Files to watch
 |
 | - SCSS to compile
 | - JS to compile
 | - Views
 |
 */
const filesToRefresh = [
  // `${assetsPath}/views/**/*.blade.php`,
  // `${assetsPath}/scss/**/*.scss`,
  // `${assetsPath}/js/**/*.js`,
]

/*
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 | That's all, stop editing, happy development
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 */

const commandArray = {
  js_lint: [],
  js_prettier: [],
  scss_lint: [],
  scss_prettier: [],
  php_lint: []
}

const assetsToCompile = []

if (assetsFiles.length) {
  assetsFiles.forEach(group => {
    if (group) {
      /*
      |--------------------------------------------------------------------------
      | Javascript Compilation
      |--------------------------------------------------------------------------
      |
      | Create array of files to compile
      |
      | Add lint command to array
      | Add prettier command to array
      |
      */
      if (group.scripts?.length) {
        group.scripts.forEach(file => {
          if (isProduction) {
            // Javascript linter file path
            if (chore === 'all' || chore === 'lint:js') {
              const javascriptLinter = `npx eslint --config ${resolve(__dirname, '.eslintrc.js')} --ignore-path ${resolve(__dirname, '.eslintignore')} --fix ${file.input}/**/*.js`
              if (!commandArray.js_lint.includes(javascriptLinter)) {
                commandArray.js_lint.push(javascriptLinter)
              }
            }

            // Javascript prettier cmd
            if (chore === 'all' || chore === 'prettier:js') {
              const javascriptPrettier = `npx prettier --config ${resolve(__dirname, '.prettierrc.js')} --ignore-path ${resolve(__dirname, '.prettierignore')} --write ${file.input}/**/*.js`
              if (!commandArray.js_prettier.includes(javascriptPrettier)) {
                commandArray.js_prettier.push(javascriptPrettier)
              }
            }
          }

          // Javascript compilation
          if (chore === undefined || chore === 'all' || chore.includes('js')) {
            if (!assetsToCompile.includes(`${file.input}/${file.name}.js`)) {
              assetsToCompile.push(`${file.input}/${file.name}.js`)
            }
          }
        })
      }

      /*
      |--------------------------------------------------------------------------
      | SCSS Compilation
      |--------------------------------------------------------------------------
      |
      | Create array of files to compile
      |
      | Add lint command to array
      | Add prettier command to array
      |
      */
      if (group.styles?.length) {
        group.styles.forEach(file => {
          if (isProduction) {
            // SCSS lint cmd
            if (chore === 'all' || chore === 'lint:scss') {
              const styleLintCommand = `npx stylelint --config ${resolve(__dirname, '.stylelintrc.json')}  --ignore-path ${resolve(__dirname, '.stylelintignore')} --fix ${file.input}/**/*.scss`
              if (!commandArray.scss_lint.includes(styleLintCommand)) {
                commandArray.scss_lint.push(styleLintCommand)
              }
            }

            // SCSS prettier cmd
            if (chore === 'all' || chore === 'prettier:scss') {
              const stylePrettier = `npx prettier --config ${resolve(__dirname, '.prettierrc.js')} --ignore-path ${resolve(__dirname, '.prettierignore')} --write ${file.input}/**/*.scss`
              if (!commandArray.scss_prettier.includes(stylePrettier)) {
                commandArray.scss_prettier.push(stylePrettier)
              }
            }
          }

          // SCSS compilation
          if (chore === undefined || chore === 'all' || chore.includes('scss')) {
            if (!assetsToCompile.includes(`${file.input}/${file.name}.scss`)) {
              assetsToCompile.push(`${file.input}/${file.name}.scss`)
            }
          }
        })
      }
    }
  })
}

export default defineConfig({
  plugins: [
    laravel({
      input: assetsToCompile,
      refresh: [{
        paths: filesToRefresh
      }]
    }),
    isProduction
      ? run({
        silent: false,
        skipDts: true,
        input: [
          chore === 'all' || chore === 'prettier:scss'
            ? {
              name: 'prettier:scss',
              run: [
                commandArray.scss_prettier,
              ].flat(),
              condition: () => chore === 'all' || chore === 'prettier:scss'
            }
            : false,
          chore === 'all' || chore === 'lint:scss'
            ? {
              name: 'lint:scss',
              run: [
                commandArray.scss_lint,
              ].flat(),
            }
            : false,
          chore === 'all' || chore === 'prettier:js'
            ? {
              name: 'prettier:js',
              run: [
                commandArray.js_prettier,
              ].flat(),
            }
            : false,
          chore === 'all' || chore === 'lint:js'
            ? {
              name: 'lint:js',
              run: [
                commandArray.js_lint,
              ].flat(),
            }
            : false
        ].filter(Boolean)
      })
      : false,
  ].filter(Boolean),
  build: {
    write: true,
    minify: isProduction ? 'terser' : false,
    terserOptions: isProduction
      ? {
        keep_fnames: true,
        compress: {
          pure_funcs: [
            'console.log'
            // 'console.error',
            // 'console.warn',
            // ...
          ]
        },
        // Make sure symbols under `pure_funcs`,
        // are also under `mangle.reserved` to avoid mangling.
        mangle: {
          reserved: [
            'console.log',
            '__'
            // 'console.error',
            // 'console.warn',
            // ...
          ]
        },
        output: {
          comments: false
        }
      }
      : null,
    outDir: distPath,
    emptyOutDir: true,
  },
  server: {
    cors: true,
    strictPort: true,
    port: 3000,
    https: false,
    hmr: {
      host: 'localhost'
    },
  },
  css: {
    devSourcemap: !isProduction,
    postcss: {
      plugins: [
        autoprefixer
      ],
    }
  }
})
