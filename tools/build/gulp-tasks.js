'use strict';

let settings = require('./build-config.json');

const gulp = require('gulp'),
  $ = require('gulp-load-plugins')(settings.plugins.pluginloader),
  $$ = require('./gulp-helpers');

$.webpackConfig = require('./webpack.config');
settings = $$.loadSettings(settings);

const tasks = {};

const dummy = function(done) {
  done();
};

dummy.displayName = 'dummy';

const clean = {
  'public': function(done) {
    $.rimraf(`${settings.paths.public.root}/**`, done);
  },
  artifacts: function(done) {
    $.rimraf(`${settings.paths.public.assets.root}/index.html`, done);
  },
  server: function(done) {
    $.rimraf(`${settings.paths.server}/server*.*`, done);
  },
  cache: function(done) {
    $.rimraf(settings.paths.cache, done);
  },
  temp: function(done) {
    $.rimraf(settings.paths.temp.root, done);
  }
};

clean.public.displayName = 'clean:public';
clean.artifacts.displayName = 'clean:artifacts';
clean.server.displayName = 'clean:server';
clean.cache.displayName = 'clean:cache';
clean.temp.displayName = 'clean:temp';

const assets = {
  sass: {
    lib: {
      sasslint: function(done) {
        gulp.src(`${settings.paths.src.client.assets.sass}/**/*.scss`)
          .pipe($$.sasslint(settings))
          .pipe($$.dummy(settings, '**/*.*'))
          .on('end', done);
      },
      stylelint: function(done) {
        const processors = [
          $$.stylelint(settings),
          $.reporter({
            formatter: $$.reporterFormatter,
            clearMessages: true
          })
        ];

        gulp.src(`${settings.paths.src.client.assets.sass}/**/*.scss`)
          .pipe($.postcss(processors, {syntax: $.scss}))
          .pipe($$.dummy(settings, '**/*.*'))
          .on('end', done);
      },
      colorguard: function(done) {
        const processors = [
          $.autoprefixer(settings.plugins.autoprefixer),
          $.colorguard(),
          $.reporter({
            formatter: $$.reporterFormatter,
            clearReportedMessages: true
          })
        ];

        gulp.src(`${settings.paths.src.client.assets.sass}/**/*.scss`)
          .pipe($$.sass({sourcemaps: true}))
          .pipe($.postcss(processors))
          .pipe($$.dummy(settings))
          .on('end', done);
      },
      refactor: function(done) {
        const processors = [
          $$.stylelint(settings),
          $.stylefmt(),
          $.reporter({
            formatter: $$.reporterFormatter,
            clearMessages: true
          })
        ];

        gulp.src(`${settings.paths.src.client.assets.sass}/**/*.scss`)
          .pipe($.postcss(processors, {syntax: $.scss}))
          .pipe(gulp.dest(settings.paths.temp.root))
          .on('end', done); //TODO: change dest (currently temp)
      }
    }
  }
};

assets.sass.lib.sasslint.displayName = 'lint:sass-lib';
assets.sass.lib.stylelint.displayName = 'lint:style-lib';
assets.sass.lib.refactor.displayName = 'stylefmt:sass-lib';

const views = {
  assets: {
    copy: function(done) {
      gulp.src(`${settings.paths.public.assets.root}/index.html`)
        .pipe($$.changed(settings, settings.paths.public.root))
        .pipe(gulp.dest(settings.paths.public.root))
        .pipe($$.debug(settings))
        .on('end', done);
    }
  }
};

views.assets.copy.displayName = 'copy:index.html';

const bundle = {
  spa: {
    dev: function(done) {
      const conf = $.webpackConfig({ env: 'dev' }, $$.root, settings);

      $.webpack(conf)
        .run(function(err, stats) {
          $$.webpackFormatter(err, stats, done);
        });
    },
    prod: function(done) {
      const conf = $.webpackConfig({ env: 'prod' }, $$.root, settings);

      $.webpack(conf)
        .run(function(err, stats) {
          $$.webpackFormatter(err, stats, done);
        });
    }
  },
  universal: {
    browser: {
      dev: function(done) {
        const conf = $.webpackConfig({
          env: 'dev',
          platform: 'browser'
        }, $$.root, settings);

        $.webpack(conf)
          .run(function(err, stats) {
            $$.webpackFormatter(err, stats, done);
          });
      },
      prod: function(done) {
        const conf = $.webpackConfig({
          env: 'prod',
          platform: 'browser'
        }, $$.root, settings);

        $.webpack(conf)
          .run(function(err, stats) {
            $$.webpackFormatter(err, stats, done);
          });
      }
    },
    server: {
      dev: function(done) {
        const conf = $.webpackConfig({
          env: 'dev',
          platform: 'server'
        }, $$.root, settings);

        $.webpack(conf)
          .run(function(err, stats) {
            $$.webpackFormatter(err, stats, done);
          });
      },
      prod: function(done) {
        const conf = $.webpackConfig({
          env: 'prod',
          platform: 'server'
        }, $$.root, settings);

        $.webpack(conf)
          .run(function(err, stats) {
            $$.webpackFormatter(err, stats, done);
          });
      }
    }
  }
};

bundle.spa.dev.displayName = 'bundle:spa-dev';
bundle.spa.prod.displayName = 'bundle:spa-prod';
bundle.universal.browser.dev.displayName = 'bundle:universal-browser-dev';
bundle.universal.browser.prod.displayName = 'bundle:universal-browser-prod';
bundle.universal.server.dev.displayName = 'bundle:universal-server-dev';
bundle.universal.server.prod.displayName = 'bundle:universal-server-prod';

tasks.dummy = dummy;
tasks.clean = clean;
tasks.assets = assets;
tasks.views = views;
tasks.bundle = bundle;

gulp.task('clean',
  gulp.series(
    tasks.clean.public,
    tasks.clean.server,
    tasks.clean.cache,
    tasks.clean.temp
  ));

gulp.task('build:spa-dev',
  gulp.series(
    settings.quick ? tasks.dummy : 'clean',
    tasks.bundle.spa.dev,
    tasks.views.assets.copy,
    tasks.clean.artifacts
  ));

gulp.task('build:spa-prod',
  gulp.series(
    settings.quick ? tasks.dummy : 'clean',
    tasks.bundle.spa.prod,
    tasks.views.assets.copy,
    tasks.clean.artifacts
  ));

gulp.task('build:universal-dev',
  gulp.series(
    settings.quick ? tasks.dummy : 'clean',
    tasks.bundle.universal.browser.dev,
    tasks.bundle.universal.server.dev,
    tasks.views.assets.copy,
    tasks.clean.artifacts
  ));

gulp.task('build:universal-prod',
  gulp.series(
    settings.quick ? tasks.dummy : 'clean',
    tasks.bundle.universal.browser.prod,
    tasks.bundle.universal.server.prod,
    tasks.views.assets.copy,
    tasks.clean.artifacts
  ));

gulp.task('review:sasslint',
  gulp.series(
    tasks.assets.sass.lib.sasslint
  ));

gulp.task('review:stylelint',
  gulp.series(
    tasks.assets.sass.lib.stylelint
  ));

gulp.task('review:colorguard',
  gulp.series(
    tasks.assets.sass.lib.colorguard
  ));

gulp.task('refactor:sass',
  gulp.series(
    tasks.assets.sass.lib.refactor
  ));
