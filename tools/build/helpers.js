const $ = {};

$.path = require('path');
$.jsonSub = require('json-sub')();

exports.root = function(args) {
  const ROOT = $.path.resolve(__dirname, '../..');
  args = Array.prototype.slice.call(arguments, 0);

  return $.path.join.apply($.path, [ROOT].concat(args));
};

exports.loadSettings = function(settings) {
  let result = $.jsonSub.substituteSync(settings, {
    '{{root}}': settings.root
  });

  result = $.jsonSub.substituteSync(result, {
    '{{src_root}}': result.paths.src.root,
    '{{tools_root}}': result.paths.tools.root,
    '{{public_root}}': result.paths.public.root
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
