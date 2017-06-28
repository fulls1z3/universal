/**
 * Webpack helpers & dependencies
 */
const webpackMerge = require('webpack-merge'),
  webpackConfig = require('angular-webpack-config');

const copyWebpackPlugin = require('copy-webpack-plugin'),
  htmlElementsWebpackPlugin = require('html-elements-webpack-plugin');

const browserConfig = function(root, settings) {
  return {
    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      /**
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new copyWebpackPlugin([
        {
          from: `${root(settings.paths.src.client.assets.root)}/config.json`,
          to: './config.json'
        },
        {
          from: `${root(settings.paths.src.client.assets.root)}/i18n/en.json`,
          to: './i18n/en.json'
        },
        {
          from: `${root(settings.paths.src.client.assets.root)}/i18n/tr.json`,
          to: './i18n/tr.json'
        }
      ]),

      /**
       * Plugin: HtmlElementsWebpackPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *  Adding this plugin configuration
       *  new HtmlElementsWebpackPlugin({
           *    headTags: { ... }
           *  })
       *
       *  Means we can use it in the template like this:
       *  <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new htmlElementsWebpackPlugin(require(root(`${settings.paths.config}/html-elements.config`)))
    ]
  };
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options, root, settings) {
  switch (options.env) {
    case 'prod':
    case 'production':
      return !!options.platform
        ? options.platform === 'server'
          ? webpackConfig.universal.server.prod(root, settings)
          : webpackMerge(webpackConfig.universal.browser.prod(root, settings), browserConfig(root, settings))
        : webpackMerge(webpackConfig.spa.prod(root, settings), browserConfig(root, settings));
    case 'test':
    case 'testing':
      return webpackConfig.test(root, settings);
    case 'dev':
    case 'development':
      return !!options.platform
        ? options.platform === 'server'
          ? webpackConfig.universal.server.dev(root, settings)
          : webpackMerge(webpackConfig.universal.browser.dev(root, settings), browserConfig(root, settings))
        : options.hmr
          ? webpackMerge(webpackConfig.spa.hmr(root, settings), browserConfig(root, settings))
          : webpackMerge(webpackConfig.spa.dev(root, settings), browserConfig(root, settings));
  }
};
