const webpackMerge = require('webpack-merge'),
  webpackConfig = require('angular-webpack-config');

const copyWebpackPlugin = require('copy-webpack-plugin'),
  htmlElementsWebpackPlugin = require('html-elements-webpack-plugin'),
  uglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const _ = require('lodash');

// const mergeUnique = function(key, uniques, getter = a => a) {
//   return (a, b, k) => (
//     k === key && [
//       ...b,
//       ..._.differenceWith(
//         a, b, item => uniques.indexOf(getter(item)) >= 0
//       )
//     ]
//   );
// };
//
// const mergePlugins = function(plugins) {
//   return mergeUnique('plugins', plugins, plugin => plugin.constructor && plugin.constructor.name);
// };

const browserConfig = function(root, settings) {
  return {
    module: {
      rules: [
        /**
         * raw-loader and css-loader for *.css in `node_modules`
         *
         * See: https://github.com/webpack-contrib/raw-loader
         * See: https://github.com/webpack-contrib/css-loader
         */
        {
          test: /\.css$/,
          use: ['raw-loader', 'css-loader'],
          include: root('node_modules')
        }
      ]
    },

    plugins: [
      new copyWebpackPlugin([
        {
          from: `${root(settings.paths.src.client.assets.root)}/config.local.json`,
          to: './config.local.json'
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

      new htmlElementsWebpackPlugin(require(root(`${settings.paths.tools.config}/html-elements.config`)))
    ]
  };
};

const prodConfig = function(mangle = true) {
  return {
    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      /**
       * Plugin: UglifyJsPlugin
       * Description: Minimize all JavaScript output of chunks.
       * Loaders are switched into minimizing mode.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
       */
      new uglifyJsPlugin({
        uglifyOptions: {
          ecma: 6,
          mangle
        }
      })
    ]
  };
};

module.exports = function(options, root, settings) {
  switch (options.env) {
    case 'prod':
    case 'production':
      return options.mode === 'stage' || options.mode === 'staging'
        ? !!options.platform
          ? options.platform === 'server'
            // ? webpackMerge({
            //   customizeArray: mergePlugins(['UglifyJsPlugin'])
            // })(webpackConfig.universal.server.prod(root, settings), {})
            ? webpackMerge(webpackConfig.universal.server.prod(root, settings))
            // : webpackMerge({
            //   customizeArray: mergePlugins(['UglifyJsPlugin'])
            // })(webpackConfig.universal.browser.prod(root, settings), browserConfig(root, settings))
            : webpackMerge(webpackConfig.universal.browser.prod(root, settings), browserConfig(root, settings))
          // : webpackMerge({
          //   customizeArray: mergePlugins(['UglifyJsPlugin'])
          // })(webpackConfig.spa.prod(root, settings), browserConfig(root, settings))
          : webpackMerge(webpackConfig.spa.prod(root, settings), browserConfig(root, settings))
        : !!options.platform
          ? options.platform === 'server'
            // ? webpackConfig.universal.server.prod(root, settings)
            ? webpackMerge(webpackConfig.universal.server.prod(root, settings), prodConfig(false))
            : webpackMerge(webpackConfig.universal.browser.prod(root, settings), browserConfig(root, settings), prodConfig())
          : webpackMerge(webpackConfig.spa.prod(root, settings), browserConfig(root, settings), prodConfig());
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
