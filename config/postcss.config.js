/**
 * PostCSS helpers & dependencies
 */
const settings = require('./build-config');

/**
 * PostCSS configuration
 */
module.exports = () => ({
  plugins: {
    'autoprefixer': settings.plugins.autoprefixer
  }
});
