const webpackMerge = require('webpack-merge'),
  webpackConfig = require('angular-webpack-config');

const copyWebpackPlugin = require('copy-webpack-plugin'),
  htmlElementsWebpackPlugin = require('html-elements-webpack-plugin');

const defaultConfig = function(root) {
  return {
    resolve: {
      alias: {
        '~': root('src/client')
      }
    },

    module: {
      rules: [
        /**
         * Temporary parser rule until Angular remains compatible with modern tooling
         *
         * See: https://github.com/angular/angular/issues/21560
         */
        {
          parser: {system: true}
        }
      ]
    }
  };
};

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
      ],
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

module.exports = function(options, root, settings) {
  switch (options.env) {
    case 'prod':
    case 'production':
      return options.mode === 'stage' || options.mode === 'staging'
        ? !!options.platform
          ? options.platform === 'server'
            ? webpackMerge(webpackConfig.universal.server.prod(root, settings), defaultConfig(root))
            : webpackMerge(webpackConfig.universal.browser.prod(root, settings), defaultConfig(root), browserConfig(root, settings))
          : webpackMerge(webpackConfig.spa.prod(root, settings), defaultConfig(root), browserConfig(root, settings))
        : !!options.platform
          ? options.platform === 'server'
            ? webpackMerge(webpackConfig.universal.server.prod(root, Object.assign(settings, {minimize: true})), defaultConfig(root))
            : webpackMerge(webpackConfig.universal.browser.prod(root, Object.assign(settings, {minimize: true}), defaultConfig(root)),
              browserConfig(root, settings))
          : webpackMerge(webpackConfig.spa.prod(root, Object.assign(settings, {minimize: true})), defaultConfig(root), browserConfig(root, settings));
    case 'dev':
    case 'development':
      return !!options.platform
        ? options.platform === 'server'
          ? webpackMerge(webpackConfig.universal.server.dev(root, settings), defaultConfig(root))
          : webpackMerge(webpackConfig.universal.browser.dev(root, settings), defaultConfig(root), browserConfig(root, settings))
        : options.hmr
          ? webpackMerge(webpackConfig.spa.hmr(root, settings), defaultConfig(root), browserConfig(root, settings))
          : webpackMerge(webpackConfig.spa.dev(root, settings), defaultConfig(root), browserConfig(root, settings));
  }
};
