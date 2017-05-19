// Karma configuration
// Generated on Mon Mar 20 2017 15:06:42 GMT+0100 (CET)

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const angular = require('rollup-plugin-angular');
const typescript = require('rollup-plugin-typescript');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/*.ts',
      'src/*.spec.ts'
    ],

    plugins: [
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-rollup-plugin'),
      require('karma-jasmine')
    ],    

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.ts': ['rollup'],
      'src/*.spec.ts': ['rollup']
    },

    rollupPreprocessor: {
      context: 'this',
      // will help to prevent conflicts between different tests entries
      moduleName: '@ngx-prism/core',
      format: 'iife',
      sourceMap: 'inline',
      // rollup settings. See Rollup documentation
      plugins: [
        angular(),
        typescript({
          typescript: require('./node_modules/typescript')
        }),
        commonjs(),
        nodeResolve({
          jsnext: true,
          browser: true,
          extensions: [ '.js', '.json', 'html']
        })
      ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
