/**
 * Dependencies
 */
let settings = require('./build-config.json');

const $$ = require('./gulp-helpers'),
  webpackConfig = require('./webpack.config');

settings = $$.loadSettings(settings);

const conf = webpackConfig({ env: 'test' }, $$.root, settings);

module.exports = function(config) {
  const configuration = {
    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /**
     * Frameworks to use
     *
     * See: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    client: {
      captureConsole: false
    },

    // list of files / patterns to load in the browser
    files: [
      {
        pattern: './config/spec-bundle.js',
        watched: false
      }
    ],

    /**
     * Pre-process matching files before serving them to the browser
     *
     * See: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    webpack: conf,

    // webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    },

    /**
     * Test results reporter to use
     *
     * See: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'coverage', 'coverage-istanbul'],

    coverageReporter: {
      type: 'in-memory'
    },

    coverageIstanbulReporter: {
      reports: ['html', 'text-summary'],
      dir: './coverage',
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /**
     * Level of logging
     *
     * config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    /**
     * Start these browsers
     *
     * See: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      'Chrome'
    ],

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    /**
     * Continuous Integration mode
     *
     * If true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  };

  if (process.env.TRAVIS) {
    configuration.browsers = [
      'ChromeTravisCi'
    ];
  }

  config.set(configuration);
};
