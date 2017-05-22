/**
 * Webpack helpers & dependencies
 */
let settings = require('./build-config');
const $$ = require('./webpack-helpers'),
  webpackMerge = require('webpack-merge');

settings = $$.loadSettings(settings);

const definePlugin = require('webpack/lib/DefinePlugin'),
  checkerPlugin = require('awesome-typescript-loader').CheckerPlugin,
  aotPlugin = require('@ngtools/webpack').AotPlugin,
  copyWebpackPlugin = require('copy-webpack-plugin'),
  loaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin'),
  assetsPlugin = require('assets-webpack-plugin'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  extractTextPlugin = require('extract-text-webpack-plugin'),
  htmlElementsWebpackPlugin = require('html-elements-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
const defaultConfig = function(options) {
  const PORT = settings.port[options.platform];

  return {
    /**
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: $$.root(settings.paths.public.assets),
      publicPath: 'assets/'
    },

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      /**
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js'],

      // An array of directory names to be resolved to the current directory
      modules: [
        $$.root(settings.paths.NODE_MODULES),
        $$.root()
      ]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
      new definePlugin({
        'ENV': JSON.stringify(options.env),
        'process.env': {
          'ENV': JSON.stringify(options.env),
          'NODE_ENV': JSON.stringify(options.env),
          'HOST': JSON.stringify(settings.host),
          'PORT': JSON.stringify(PORT)
        }
      }),

      /**
       * Plugin: CheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new checkerPlugin(),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new loaderOptionsPlugin({
        options: {
          tslint: {
            failOnHint: false
          }
        }
      })
    ]
  };
};

const serverConfig = {
  target: 'node',

  /**
   * The entry point for the bundle
   * Our Angular app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: $$.root(`${settings.paths.src.server.root}/server.ts`),

  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: 'server.js',

    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    sourceMapFilename: 'server.bundle.map',

    /**
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
    chunkFilename: 'server.[id].chunk.js',

    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: $$.root(settings.paths.server)
  },

  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      /**
       * TS linter
       */
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: 'tslint-loader',
        exclude: [
          $$.root(settings.paths.NODE_MODULES),
          /\.(ngfactory|ngstyle)\.ts$/
        ]
      },

      /**
       * Typescript loader support for .ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        use: '@ngtools/webpack',
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /**
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },

      /**
       * Raw loader support for all other files.
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.(scss|html|png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'raw-loader'
      }
    ]
  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new aotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: $$.root(`${settings.paths.src.server.app}/app.server.module#AppServerModule`),
      skipCodeGeneration: true
    })
  ],

  /**
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

const browserConfig = function(options) {
  const isProd = options.env === 'production';

  return {
    target: 'web',

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {
      rules: [
        /**
         * TS linter
         */
        {
          enforce: 'pre',
          test: /\.ts$/,
          use: 'tslint-loader',
          exclude: [
            $$.root(settings.paths.NODE_MODULES),
            /\.(ngfactory|ngstyle)\.ts$/
          ]
        },

        /**
         * Typescript loader support for .ts and Angular async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          use: isProd
            ? '@ngtools/webpack'
            : [
              'ng-router-loader',
              'awesome-typescript-loader?declaration=false',
              'angular2-template-loader'
            ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        /**
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        /**
         * Style, css and sass loaders support for *.scss files
         * Bundles in an external css file
         */
        {
          test: /\.scss$/,
          include: $$.root(settings.paths.src.client.assets.sass),
          use: extractTextPlugin.extract({
            fallback: 'style-loader',
            //use: `css-loader${isProd ? '?minimize' : '?sourceMap'}!postcss-loader!sass-loader${!isProd ? '?sourceMap' : ''}!stylefmt-loader?config=${settings.paths.config}/stylelint.config.js`
            // TODO: temporarily disabled for sourcemaps interference
            use: `css-loader!postcss-loader!sass-loader!stylefmt-loader?config=${settings.paths.config}/stylelint.config.js`
          })
        },

        /**
         * To-string, css and sass loader support for *.scss files
         * Returns file content as string
         */
        {
          test: /\.scss$/,
          include: $$.root(settings.paths.src.client.app),
          use: [
            'to-string-loader',
            // TODO: temporarily disabled for sourcemaps interference
            //`css-loader${isProd ? '?minimize' : '?sourceMap'}`,
            `css-loader`,
            'postcss-loader',
            // TODO: temporarily disabled for sourcemaps interference
            //`sass-loader${!isProd ? '?sourceMap' : ''}`,
            `sass-loader`,
            `stylefmt-loader?config=${settings.paths.config}/stylelint.config.js`
          ]
        },

        /**
         * Raw loader support for *.html
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          use: 'html-loader',
          exclude: [$$.root(`${settings.paths.src.client.root}/index.html`)]
        },

        /**
         * File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: 'file-loader?name=assets/[name].[chunkhash].[ext]'
        }
      ]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      /**
       * Plugin: AssetsPlugin
       * Description: Emits a json file with assets paths.
       *
       * See: https://github.com/kossnocorp/assets-webpack-plugin
       */
      new assetsPlugin({
        path: $$.root(settings.paths.public.assets),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

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
          from: `${$$.root(settings.paths.src.client.assets.root)}/config.json`,
          to: './config.json'
        },
        {
          from: `${$$.root(settings.paths.src.client.assets.root)}/i18n/en.json`,
          to: './i18n/en.json'
        },
        {
          from: `${$$.root(settings.paths.src.client.assets.root)}/i18n/tr.json`,
          to: './i18n/tr.json'
        }
      ]),

      /**
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new htmlWebpackPlugin({
        template: $$.root(`${settings.paths.src.client.root}/index.html`),
        chunksSortMode: 'dependency'
      }),

      /**
       * Plugin: ExtractTextPlugin
       * Description: Extracts text from bundle into a file.
       *
       * See: https://github.com/webpack/extract-text-webpack-plugin
       */
      new extractTextPlugin(`[name]${isProd ? '.[chunkhash]' : ''}.style.css`),

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
      new htmlElementsWebpackPlugin(require($$.root(`${settings.paths.config}/html-elements.config`))),

      /**
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new scriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      })
    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      fs: 'empty'
    }
  };
};

module.exports = function(options) {
  return webpackMerge(defaultConfig(options), options.platform === 'server' ? serverConfig : browserConfig(options));
};
