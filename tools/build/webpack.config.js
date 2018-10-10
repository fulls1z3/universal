module.exports = {
  module: {
    rules: [
      /**
       * tslint-loader
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: 'tslint-loader',
        exclude: [
          'node_modules',
          /\.(ngfactory|ngstyle)\.ts$/
        ]
      },
    ]
  }
};
