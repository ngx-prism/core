// Karma configuration

const angular = require('rollup-plugin-angular');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');

// rollup-plugin-angular addons
const sass = require('node-sass');
const CleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');

const cssmin = new CleanCSS();
const htmlminOpts = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true,
};

const rpaConfig = {
  preprocessors: {
    template: template => htmlMinifier.minify(template, htmlminOpts),
    style: scss => {
      const css = sass.renderSync({ data: scss }).css;
      return cssmin.minify(css).styles;
    },
  }
};

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Make sure to disable Karma’s file watcher
      // because the preprocessor will use its own.
      { pattern: 'test/index.ts', watched: false },
      { pattern: 'test/*.spec.ts', watched: false },
      { pattern: 'src/*.spec.ts', watched: false },
      { pattern: 'src/**/*.spec.ts', watched: false }
    ],


    plugins: [
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-firefox-launcher'),
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-rollup-preprocessor'),
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.ts': ['rollup'],
      'src/*.spec.ts': ['rollup'],
      'src/**/*.spec.ts': ['rollup']
    },

    rollupPreprocessor: {
      // will help to prevent conflicts between different tests entries
      external: [
        {'lodash-es': '_'},
        {'prismjs': 'Prism'}
      ],  
      name: 'ngx-prism.core',
      format: 'umd',
      sourcemap: 'inline',
      // rollup settings. See Rollup documentation
      plugins: [
        angular({}),
        commonjs(),
        nodeResolve({
          // use "module" field for ES6 module if possible
          module: true, // Default: true
    
          // use "jsnext:main" if possible
          // – see https://github.com/rollup/rollup/wiki/jsnext:main
          jsnext: true,  // Default: false
    
          // use "main" field or index.js, even if it's not an ES6 module
          // (needs to be converted from CommonJS to ES6
          // – see https://github.com/rollup/rollup-plugin-commonjs
          main: true,  // Default: true
    
          // some package.json files have a `browser` field which
          // specifies alternative files to load for people bundling
          // for the browser. If that's you, use this option, otherwise
          // pkg.browser will be ignored
          browser: true,  // Default: false
    
          // not all files you want to resolve are .js files
          extensions: [ '.js', '.json' ],  // Default: ['.js']
    
          // whether to prefer built-in modules (e.g. `fs`, `path`) or
          // local ones with the same names
          preferBuiltins: true,  // Default: true
    
          // Lock the module search in this path (like a chroot). Module defined
          // outside this path will be mark has external
          jail: '/', // Default: '/'
    
          // If true, inspect resolved files to check that they are
          // ES2015 modules
          modulesOnly: false, // Default: false
    
          // Any additional options that should be passed through
          // to node-resolve
          customResolveOptions: {}
        }),
        typescript({
          typescript: require('./node_modules/typescript')
        })
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'kjhtml'],

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
