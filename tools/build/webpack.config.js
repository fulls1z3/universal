module.exports = {
  module: {
    rules: [
      /**
       * tslint-loader
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: 'tslint-loader'
      }
    ]
  }
};
