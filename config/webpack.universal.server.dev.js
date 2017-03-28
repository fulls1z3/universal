/**
 * Webpack helpers & dependencies
 */
const devConfig = require('./webpack.common.dev');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = devConfig({platform: 'server'});
