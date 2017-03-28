/**
 * Helpers & dependencies
 */
require('ts-node/register');

let settings = require('./build-config');
const $$ = require('./helpers');

settings = $$.loadSettings(settings);

exports.config = {
  baseUrl: 'http://localhost:54387/',

  // use `npm run e2e`
  specs: [
    $$.root(`${settings.paths.src.root}/e2e/**/**.e2e.ts`),
    $$.root(`${settings.paths.src.root}/e2e/**/*.e2e.ts`)
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },

  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  // onPrepare: function() {
  //   browser.ignoreSynchronization = true;
  // },

  /**
   * Angular configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true
};
