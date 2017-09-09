const gulp = require('gulp'),
  $ = {},
  $$ = require('./helpers');

$.lazypipe = require('lazypipe');
$.changed = require('gulp-changed');
$.debug = require('gulp-debug');
$.ignore = require('gulp-ignore');
$.sass = require('gulp-sass');
$.sourcemaps = require('gulp-sourcemaps');
$.sasslint = require('gulp-sass-lint');
$.stylelint = require('stylelint');
$.tslint = require('gulp-tslint');
$._ = require('lodash');
$.chalk = require('chalk');
$.symbols = require('log-symbols');

exports.root = $$.root;
exports.loadSettings = $$.loadSettings;

exports.done = function(err, callback) {
  if (err) {
    process.exit(1);
    callback();
  }

  callback();
};

exports.changed = function(settings, path, extension) {
  return $.lazypipe()
    .pipe(function() {
      return settings.quick ? $.changed(path, !!extension ? {extension: extension} : {}) : undefined;
    })();
};

exports.dummy = function(settings, glob) {
  return $.lazypipe()
    .pipe(function() {
      return $.ignore.exclude(!!glob ? glob : '*.*');
    })
    .pipe(function() {
      return gulp.dest(settings.paths.temp);
    })();
};

exports.debug = function(settings, glob) {
  return $.lazypipe()
    .pipe(function() {
      return settings.debug ? $.debug(settings.plugins.debugger) : undefined;
    })
    .pipe(function() {
      return settings.debug ? $.ignore.exclude(!!glob ? glob : '*.*') : undefined;
    })
    .pipe(function() {
      return settings.debug ? gulp.dest(settings.paths.temp) : undefined;
    })();
};

exports.sass = function(options) {
  if (!options)
    options = {
      sourcemaps: undefined
    };

  return $.lazypipe()
    .pipe(function() {
      return options.sourcemaps ? $.sourcemaps.init() : undefined;
    })
    .pipe(function() {
      return $.sass();
    })
    .pipe(function() {
      return options.sourcemaps ? $.sourcemaps.write() : undefined;
    })();
};

exports.sasslint = function(settings) {
  return $.lazypipe()
    .pipe(function() {
      return $.sasslint({configFile: `${settings.paths.tools.config}/.sasslint.yml`});
    })
    .pipe(function() {
      return $.sasslint.format();
    })();
};

exports.stylelint = function(settings) {
  return $.lazypipe()
    .pipe(function() {
      return $.stylelint({configFile: `${settings.paths.tools.config}/stylelint.config.js`});
    })();
};

exports.tslint = function() {
  return $.lazypipe()
    .pipe(function() {
      return $.tslint({formatter: 'verbose'});
    })
    .pipe(function() {
      return $.tslint.report({emitError: false});
    })();
};

exports.reporterFormatter = function(input) {
  const format = function(message) {
    let str = '';

    if (message.text) {
      // TODO: inspect -> removal
      // const regExp = /(.+)( \(.+\))/,
      //   messageText = regExp.exec(message.text);

      if (message.line && message.column)
        str += `  ${message.line}:${message.column} `;

      str += $.symbols[message.type] + ' ' + message.text; // TODO: inspect -> messageText[1];

      if (message.rule)
        str += $.chalk.gray(` (${message.rule})`);

      if (message.plugin)
        str += $.chalk.gray(` [${message.plugin}]`);
    }

    return str;
  };

  const messages = input.messages;
  let output = '';

  if (input.source)
    output += $.chalk.green(`Source: ${input.source}\n`);

  let warnings = 0,
    errors = 0;

  messages.forEach(function(message) {
    output += format(message) + '\n';

    switch (message.type) {
      case 'warning':
        warnings++;
        break;
      case 'error':
        errors++;
        break;
    }
  });

  if (warnings > 0)
    output += $.chalk.gray(`    (${warnings}) warning(s) total.\n`);

  if (errors > 0)
    output += $.chalk.red(`    (${errors}) error(s) total.\n`);

  return !$._.isEmpty(messages) ? output : '';
};

exports.webpackFormatter = function(err, stats, callback, settings) {
  if (err) {
    console.log($.chalk.red(`Error: ${err}`));
    callback();
  } else {
    const statsJson = stats.toJson(),
      warnings = statsJson.warnings,
      errors = statsJson.errors;

    Object.keys(warnings)
      .forEach(function(key) {
        console.log($.chalk.gray(`Warning: ${warnings[key]}\n`));
      });

    if (warnings.length > 0)
      console.log($.chalk.gray(`    (${warnings.length}) warning(s) total.\n`));

    Object.keys(errors)
      .forEach(function(key) {
        console.log($.chalk.red(`Error: ${errors[key]}\n`));
      });

    if (errors.length > 0)
      console.log($.chalk.red(`    (${errors.length}) error(s) total.\n`));

    Object.keys(stats.compilation.assets)
      .forEach(function(key) {
        console.log(`Webpack: output ${$.chalk.green(key)}`);
      });

    console.log(`Webpack: ${$.chalk.blue(`finished`)}`);

    if (!!settings && !!settings.paths && !!settings.paths.public && !!settings.paths.public.assets && !!settings.paths.public.assets.root)
      require('fs').writeFileSync($$.root(`${settings.paths.public.assets.root}/stats.json`), JSON.stringify(statsJson));

    callback();
  }
};
