/**
 * Dependencies
 */
const $ = {};

$.path = require('path');
$.jsonSub = require('json-sub')();

/**
 * Helper methods
 */
const root = function(args) {
  const ROOT = $.path.resolve(__dirname, '..');
  args = Array.prototype.slice.call(arguments, 0);

  return $.path.join.apply($.path, [ROOT].concat(args));
};

const loadSettings = function(settings) {
  let result = $.jsonSub.substituteSync(settings, {
    '{{root}}': settings.root
  });

  result = $.jsonSub.substituteSync(result, {
    '{{src_root}}': result.paths.src.root,
    '{{public_root}}': result.paths.public.root,
    '{{temp_root}}': result.paths.temp.root
  });

  result = $.jsonSub.substituteSync(result, {
    '{{src_server_root}}': result.paths.src.server.root,
    '{{src_client_root}}': result.paths.src.client.root
  });

  result = $.jsonSub.substituteSync(result, {
    '{{src_assets_root}}': result.paths.src.client.assets.root,
    '{{public_assets_root}}': result.paths.public.assets.root
  });

  return result;
};

/**
 * Exports
 */
exports.root = root;
exports.loadSettings = loadSettings;
