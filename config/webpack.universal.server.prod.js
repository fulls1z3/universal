/**
 * Webpack helpers & dependencies
 */
const prodConfig = require('./webpack.common.prod');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = prodConfig({platform: 'server'});
