const settings = require('../build/build-config');

module.exports = () => ({
  plugins: {
    'autoprefixer': settings.plugins.autoprefixer
  }
});
