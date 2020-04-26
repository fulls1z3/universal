const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    alias: {
      '@fulls1z3/shared/ui-material' : path.resolve(__dirname, '../libs/shared/ui-material/src/')
    }
  },
  plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-us/)]
};
