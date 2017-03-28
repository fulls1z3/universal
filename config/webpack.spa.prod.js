/**
 * Webpack helpers & dependencies
 */
let settings = require('./build-config');
const $$ = require('./webpack-helpers'),
  defaultConfig = require('./webpack.spa.common'),
  prodConfig = require('./webpack.common.prod'),
  webpackMerge = require('webpack-merge');

settings = $$.loadSettings(settings);

const aotPlugin = require('@ngtools/webpack').AotPlugin;

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(defaultConfig, prodConfig({platform: 'browser'}), {
  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new aotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: $$.root(`${settings.paths.src.client.app}/app.module#AppModule`)
    })
  ]
});
