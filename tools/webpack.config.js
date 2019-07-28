module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: 'tslint-loader'
      }
    ]
  }
};
