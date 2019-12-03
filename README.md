# universal

<!-- prettier-ignore-start -->
[![CircleCI](https://circleci.com/gh/fulls1z3/universal.svg?style=shield)](https://circleci.com/gh/fulls1z3/universal)
[![coverage](https://codecov.io/github/fulls1z3/universal/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/universal)
[![Code Quality: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fulls1z3/universal.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fulls1z3/universal/context:javascript)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/fulls1z3/universal.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fulls1z3/universal/alerts)
[![Greenkeeper badge](https://badges.greenkeeper.io/fulls1z3/universal.svg)](https://greenkeeper.io/)
[![Join the chat at https://gitter.im/fulls1z3-universal](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/fulls1z3-universal/lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<!-- prettier-ignore-end -->

> Please support this project by simply putting a GitHub star. Share this library with friends on twitter and everywhere else you can.

**`universal`** is a seed project for Angular Universal apps following the common patterns and [best practices](https://angular.io/styleguide)
in file and application organization, providing the following features:

- [x] Providing a seed project using the [Angular] framework.
- [x] **NEW**: Extending workspace/monorepo capabilities by [Nx]!
- [x] Includes [ngrx-powered] **CRUD feature** tutorial.
- [x] Compiling bundles for both browser (_SPA_) and server ([Angular Universal]) platforms.
- [x] Rebased on [Angular CLI] to focus on features and development productivity, not on build tools.
- [x] Customizable webpack configuration via [@angular-builders].
- [x] Using the modern **UI components** of [Angular Material].
- [x] Dynamic **responsive** layouts via [flex-layout].
- [x] Built-in **Hot Module Replacement** to save valuable development time.
- [x] Development, staging and production modes.
- [x] Performing [AoT compilation] for rapid page loads on staging/production builds.
- [x] Tree-shaking and minifying the production builds using [Angular Devkit].
- [x] Cross-browser **[SCSS]** with [autoprefixer] and [browserslist].
- [x] **[stylelint-config-standard]** as configuration preset for [stylelint] and **custom rules** to standardize stylesheets.
- [x] Transferring server responses on client bootstrap to prevent app flickering with native [TransferState]`.
- [x] Deferring initialization of modules via [Lazy loading].
- [x] Uses [ngrx/store] for **state management**.
- [x] **NEW** Uses [ngrx/entity] state adapter to **manipulate** and **query** entity collections.
- [x] **NEW** Uses [ngrx/effects] side effect model to to model **event sources** as **actions**.
- [x] **NEW** Uses [unionize] for **boilerplate-free** functional sum types.
- [x] Uses **[ngx-config]** for configuration management.
- [x] Uses **[ngx-auth]** for basic JWT-based authentication (_w/Universal support_).
- [x] Uses **[ngx-cache]** for application-wide caching.
- [x] Uses [ngx-translate] for i18n support.
- [x] Uses **[ngx-meta]** for SEO (_title, meta tags, and Open Graph tags for social sharing_).
- [x] Uses [ngx-perfect-scrollbar] for scrollbars.
- [x] Vendor-agnostic analytics via [angulartics2].
- [x] Unit tests with **[Jest]**, including code coverage.
- [x] Seamless integration with [CircleCI] continuous integration and delivery platform.
- [x] **[angular-tslint-rules]** as configuration preset for [TSLint] and [codelyzer].

You can view the **live app** at [http://universal.buraktasci.com](http://universal.buraktasci.com).

## Table of contents:

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Setting up upstream repository](#setting-up-upstream-repository)
  - [Development and builds](#development-and-builds)
- [Contributing](#contributing)
- [License](#license)

## <a name="getting-started"> Getting started

### <a name="installation"> Installation

You can install **`universal`** by simply forking the repo:

```
# clone the repo
$ git clone https://github.com/fulls1z3/universal.git [your-project-name]
$ cd [your-project-name]
```

### <a name="setting-up-upstream-repository"> Setting up upstream repository

Once you have cloned the repo, you can follow these steps to allow sync changes made in this repo with your fork:

```
# set up `origin`
$ git remote set-url origin [your-fork-repo]

# set up `upstream` to sync future changes
$ git remote add upstream https://github.com/fulls1z3/universal.git

# verify the upstream repo specified for your fork
$ git remote -v
origin    https://github.com/YOUR_USERNAME/[your-fork-repo].git (fetch)
origin    https://github.com/YOUR_USERNAME/[your-fork-repo].git (push)
upstream  https://github.com/fulls1z3/universal.git (fetch)
upstream  https://github.com/fulls1z3/universal.git (push)

# initial push for the fork
$ git push
```

Now, you can create a new directory (ex: `src/app/shared`) to build your codebase out, while benefiting from the
client framework located at the `src/app/framework` directory.

In order to merge the latest upstream changes, simply follow:

```
# fetch the latest upstream
$ git fetch upstream

# merge the upstream changes
$ git merge upstream/master
```

then handle any conflicts, and go on with building your app.

### <a name="development-builds"> Development and builds

Below are the scripts to dev, build, and test this seed project:

#### Install dependencies

```console
# use `yarn` to install the deps
$ yarn
```

#### Development server

```
# dev server
$ ng serve

# dev server (HMR-enabled)
$ ng serve --c hmr

# dev server (AoT compilation)
$ ng serve --prod

# dev server (SSR)
$ yarn start:ssr

# dev server (SSR & AoT compilation)
$ yarn start:ssr:prod
```

And then,

- Navigate to `http://localhost:4200/` for the SPA (browser) build.
- Navigate to `http://localhost:4000/` for the SSR (universal) build.

The app will automatically re-compile if you change any of the source files.

#### Build

```
# development build
$ ng build

# production build
$ ng build --prod

# development build (SSR)
$ yarn build:ssr

# production build (SSR)
$ yarn build:ssr:prod
```

The build artifacts will be stored in the `dist/` directory.

#### Running tests

```
# run unit tests
$ ng test
```

## <a name="contributing"></a> Contributing

If you want to file a bug, contribute some code, or improve documentation, please read up on the following contribution guidelines:

- [Issue guidelines](CONTRIBUTING.md#submit)
- [Contributing guidelines](CONTRIBUTING.md)
- [Coding rules](CONTRIBUTING.md#rules)
- [Change log](CHANGELOG.md)

#### Thanks to

- [JetBrains], for their support to this open source project with free [WebStorm] licenses.

## <a name="license"></a> License

The MIT License (MIT)

Copyright (c) 2018 [Burak Tasci]

[angular]: https://angular.io
[nx]: https://nx.dev
[ngrx-powered]: http://ngrx.github.io
[angular universal]: https://angular.io/guide/universal
[angular cli]: https://cli.angular.io
[@angular-builders]: https://github.com/meltedspark/angular-builders
[angular material]: https://material.angular.io
[flex-layout]: https://github.com/angular/flex-layout
[aot compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[angular devkit]: https://github.com/angular/angular-cli
[scss]: http://sass-lang.com
[autoprefixer]: https://github.com/postcss/autoprefixer
[browserslist]: https://github.com/browserslist/browserslist
[stylelint-config-standard]: https://github.com/stylelint/stylelint-config-standard
[stylelint]: https://stylelint.io/
[lazy loading]: https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html
[transferstate]: https://angular.io/api/platform-browser/TransferState
[ngrx/store]: https://ngrx.io/guide/store
[ngrx/entity]: https://ngrx.io/guide/entity
[ngrx/effects]: https://ngrx.io/guide/effects
[unionize]: https://github.com/pelotom/unionize
[ngx-config]: https://github.com/fulls1z3/ngx-config
[ngx-auth]: https://github.com/fulls1z3/ngx-auth
[ngx-cache]: https://github.com/fulls1z3/ngx-cache
[ngx-translate]: https://github.com/ngx-translate/core
[ngx-meta]: https://github.com/fulls1z3/ngx-meta
[ngx-i18n-router]: https://github.com/fulls1z3/ngx-i18n-router
[ngx-perfect-scrollbar]: https://github.com/zefoy/ngx-perfect-scrollbar
[angulartics2]: https://github.com/angulartics/angulartics2
[jest]: https://facebook.github.io/jest
[circleci]: https://circleci.com
[angular-tslint-rules]: https://github.com/fulls1z3/angular-tslint-rules
[tslint]: https://github.com/palantir/tslint
[codelyzer]: https://github.com/mgechev/codelyzer
[jetbrains]: https://www.jetbrains.com/community/opensource
[webstorm]: https://www.jetbrains.com/webstorm
[burak tasci]: https://github.com/fulls1z3
