let settings = require('../tools/build/build-config.json');

const $$ = require('../tools/build/gulp-helpers'),
  webpackConfig = require('../tools/build/webpack.config');

settings = $$.loadSettings(settings);

const conf = webpackConfig({env: 'test'}, $$.root, settings);

module.exports = function(config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    client: {captureConsole: false},
    files: [
      {
        pattern: './config/spec-bundle.js',
        watched: false
      },
      {
        pattern: './src/client/assets/**/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ],
    proxies: {'/assets/': '/base/src/client/assets/'},
    preprocessors: {
      './config/spec-bundle.js': [
        'coverage',
        'webpack',
        'sourcemap'
      ]
    },
    webpack: conf,
    webpackMiddleware: {
      noInfo: true,
      stats: {chunks: false}
    },
    reporters: [
      'mocha',
      'coverage',
      'remap-coverage'
    ],
    coverageReporter: {type: 'in-memory'},
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeTravisCi'];
  }

  config.set(configuration);
};
