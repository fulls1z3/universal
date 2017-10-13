# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.3.0"></a>
# [1.3.0](https://github.com/ng-seed/universal/compare/v1.0.0...v1.3.0) (2017-10-13)


### Bug Fixes

* use uglifyjs-webpack-plugin ([#183](https://github.com/ng-seed/universal/issues/183)) ([bbeeb2c](https://github.com/ng-seed/universal/commit/bbeeb2c)), closes [#83](https://github.com/ng-seed/universal/issues/83)


### Features

* use project-specific custom material module ([#184](https://github.com/ng-seed/universal/issues/184)) ([3ee08d3](https://github.com/ng-seed/universal/commit/3ee08d3)), closes [#148](https://github.com/ng-seed/universal/issues/148)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/ng-seed/universal/compare/v1.0.0...v1.2.0) (2017-09-15)


### Features

* add basic JWT-based authentication with ngx-auth ([#121](https://github.com/ng-seed/universal/issues/121)) ([03c773e](https://github.com/ng-seed/universal/commit/03c773e)), closes [#118](https://github.com/ng-seed/universal/issues/118)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/ng-seed/universal/compare/v1.0.0...v1.1.0) (2017-09-14)


### Bug Fixes

* add `angular-whitespace` rule to avoid falsy warnings ([#109](https://github.com/ng-seed/universal/issues/109)) ([66cd59f](https://github.com/ng-seed/universal/commit/66cd59f)), closes [#108](https://github.com/ng-seed/universal/issues/108)


### Features

* add Github button to the header ([#116](https://github.com/ng-seed/universal/issues/116)) ([896d26a](https://github.com/ng-seed/universal/commit/896d26a)), closes [#117](https://github.com/ng-seed/universal/issues/117)
* use Angular Material components ([#103](https://github.com/ng-seed/universal/issues/103)) ([b3f2bfd](https://github.com/ng-seed/universal/commit/b3f2bfd)), closes [#53](https://github.com/ng-seed/universal/issues/53)
* use ngx-perfect-scrollbar ([#107](https://github.com/ng-seed/universal/issues/107)) ([7e17300](https://github.com/ng-seed/universal/commit/7e17300)), closes [#106](https://github.com/ng-seed/universal/issues/106)
* use stylelint-config-standard ([#105](https://github.com/ng-seed/universal/issues/105)) ([238e3cb](https://github.com/ng-seed/universal/commit/238e3cb)), closes [#104](https://github.com/ng-seed/universal/issues/104)



<a name="1.0.0"></a>
# 1.0.0 (2017-09-12)


### Bug Fixes

* bootstrapping using the `app.browser.module` instead of `app.module` ([#51](https://github.com/ng-seed/universal/issues/51)) ([53927f2](https://github.com/ng-seed/universal/commit/53927f2))
* disable `uglifyjs` for prod mode ([3259fac](https://github.com/ng-seed/universal/commit/3259fac)), closes [#11](https://github.com/ng-seed/universal/issues/11)
* fix AoT compilation ([8e52128](https://github.com/ng-seed/universal/commit/8e52128)), closes [#39](https://github.com/ng-seed/universal/issues/39) [#29](https://github.com/ng-seed/universal/issues/29)
* fix handling assets ([3d6ebb9](https://github.com/ng-seed/universal/commit/3d6ebb9)), closes [#14](https://github.com/ng-seed/universal/issues/14) [#36](https://github.com/ng-seed/universal/issues/36) [#38](https://github.com/ng-seed/universal/issues/38)
* fix uglifyjs minification ([#74](https://github.com/ng-seed/universal/issues/74)) ([2f25f21](https://github.com/ng-seed/universal/commit/2f25f21)), closes [#73](https://github.com/ng-seed/universal/issues/73)
* fix warnings related to `jasmine-marbles` ([#94](https://github.com/ng-seed/universal/issues/94)) ([3252920](https://github.com/ng-seed/universal/commit/3252920)), closes [#91](https://github.com/ng-seed/universal/issues/91)
* handle SCSS files importing resources ([eee2a22](https://github.com/ng-seed/universal/commit/eee2a22)), closes [#21](https://github.com/ng-seed/universal/issues/21)
* production build not working ([3dc4635](https://github.com/ng-seed/universal/commit/3dc4635)), closes [#11](https://github.com/ng-seed/universal/issues/11)
* rollback to `[@ngx-universal-express-engine](https://github.com/ngx-universal-express-engine)) ([fa62d11](https://github.com/ng-seed/universal/commit/fa62d11)), closes [#48](https://github.com/ng-seed/universal/issues/48)
* use correct cache dirs ([7da2dd4](https://github.com/ng-seed/universal/commit/7da2dd4)), closes [#12](https://github.com/ng-seed/universal/issues/12)


### Features

* add client framework ([#70](https://github.com/ng-seed/universal/issues/70)) ([6a50aac](https://github.com/ng-seed/universal/commit/6a50aac)), closes [#52](https://github.com/ng-seed/universal/issues/52) [#69](https://github.com/ng-seed/universal/issues/69)
* add colors to HMR stats ([23b6bf4](https://github.com/ng-seed/universal/commit/23b6bf4))
* add compodoc ([#97](https://github.com/ng-seed/universal/issues/97)) ([bd7e005](https://github.com/ng-seed/universal/commit/bd7e005)), closes [#96](https://github.com/ng-seed/universal/issues/96)
* add HMR support ([db22c44](https://github.com/ng-seed/universal/commit/db22c44)), closes [#2](https://github.com/ng-seed/universal/issues/2)
* enable `prod` mode for AoT builds ([ebbcc54](https://github.com/ng-seed/universal/commit/ebbcc54)), closes [#54](https://github.com/ng-seed/universal/issues/54)
* provide e2e tests ([#93](https://github.com/ng-seed/universal/issues/93)) ([8d3d3a5](https://github.com/ng-seed/universal/commit/8d3d3a5)), closes [#92](https://github.com/ng-seed/universal/issues/92)
* switch to offical express engine ([#31](https://github.com/ng-seed/universal/issues/31)) ([c736b3e](https://github.com/ng-seed/universal/commit/c736b3e))
* use `[@ngx-universal](https://github.com/ngx-universal)/translate-loader` ([afbe5e5](https://github.com/ng-seed/universal/commit/afbe5e5))
* use `angular-webpack-config` ([b154fcc](https://github.com/ng-seed/universal/commit/b154fcc))
* use `ngx-cache` ([3756298](https://github.com/ng-seed/universal/commit/3756298)), closes [#5](https://github.com/ng-seed/universal/issues/5)
* use HardSource plugin with DllBundle ([#86](https://github.com/ng-seed/universal/issues/86)) ([16eca4d](https://github.com/ng-seed/universal/commit/16eca4d)), closes [#79](https://github.com/ng-seed/universal/issues/79) [#85](https://github.com/ng-seed/universal/issues/85)
* use official express-engine ([#87](https://github.com/ng-seed/universal/issues/87)) ([aa5d4ca](https://github.com/ng-seed/universal/commit/aa5d4ca)), closes [#80](https://github.com/ng-seed/universal/issues/80)
* run tests with jest ([#78](https://github.com/ng-seed/universal/issues/78)) ([1a30f7a](https://github.com/ng-seed/universal/commit/1a30f7a)), closes [#77](https://github.com/ng-seed/universal/issues/77)
