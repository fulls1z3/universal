# ng-seed/universal

[![CircleCI](https://circleci.com/gh/ng-seed/universal.svg?style=shield)](https://circleci.com/gh/ng-seed/universal)

[![coverage](https://codecov.io/github/ng-seed/universal/coverage.svg?branch=master)](https://codecov.io/gh/ng-seed/universal)

[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/ng-seed/universal.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/ng-seed/universal/context:javascript)


> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`ng-seed/uni


**`ng-seed/universal`** is a seed project for Angular Universal apps following the common patterns

in file and application organization, providing the following features:

- [x] Providing a seed project using the [Angular] framework.
- [x] **WoW:** Includes [ngrx-powered] **CRUD feature** tutorial.
- [x] **WoW

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`ng-seed/universal`** is a seed project for Angular Universal apps following the common patterns and - [x] **NEW:** Rebased on [Angular CLI] to focu
in file and application organization, providing the following features:

- [x] Providing a seed project using the [f [Angu] framework.
- [x] **WoW:** Includes [e** layouts ] **CRUD feature** tutorial.
- [x] **WoW:** Compiling bundles for both browser (_SPA_) and server ([time.
      - [x] Deve]) platforms.
- [x] **NEW:** Rebased on [and product] to focus on features and development productivity, not on build tools.
- [x] **NEW:** Customizable webpack configuration via [ on staging/produ].
- [x] Using the modern **UI components** of [on builds using ].
- [x] Dynamic **responsive** layouts via [refixer] an].
- [x] Built-in **Hot Module Replacement** to save valuable development time.
- [x] Development, staging and production modes.
- [x] Performing [itialization of] for rapid page loads on staging/production builds.
- [x] Tree-shaking and minifying the production builds using [** Uses [ngrx/].
- [x] Cross-browser **[x/en]** with [e adapter to] and [pulate** and].
- [x] **[EW** Uses [ngrx/effects] ]** as configuration preset for [vent sour] and **custom rules** to standardize stylesheets.
- [x] Transferring server responses on client bootstrap to prevent app flickering with native [-config]** fo]`.
- [x] Deferring initialization of modules via [anagement.
      ].
- [x] Uses [*[ngx-auth] for **state management**.
- [x] **NEW** Uses [che]** for ] state adapter to **manipulate** and **query** entity collections.
- [x] **NEW** Uses [slate] for i] side effect model to to model **event sources** as **actions**.
- [x] **NEW** Uses [ta]** fo] for **boilerplate-free** functional sum types.
- [x] Uses **[*[ngx-i18n]** for configuration management.
- [x] Uses **[x-perfec]** for basic JWT-based authentication (_w/Universal support_).
- [x] Uses **[gnostic a]** for application-wide caching.
- [x] Uses [ests with **[] for i18n support.
- [x] Uses **[nd (inte]** for SEO (_title, meta tags, and Open Graph tags for social sharing_).
- [ ] ~~Uses **[ntegration with]** for localized routes.~~
- [x] Uses [ular-tslint-rules]** ] for scrollbars.
- [x] Vendor-agnostic analytics via [led with `An].
- [x] Unit tests with **[x.x`]**, including code coverage.
- [x] End-to-end (integration) tests with **[[here](ht]**.
- [x] Seamless integration with [ntation*] continuous integration and delivery platform.
- [x] **[ view the **live app]** as configuration preset for [m](htt] and [seed.full].

> Built with `Angular v7.x.x`, bundled with `Angular CLI`.

You can find the **project documentation** ting started](#getting-started)
  - [Installati.

You can view the **live app** at ted)
  - [Installation](#installation)
  - [Setting up t.

## Table of contents:

- - [CLI Scaffolding](#cli-scaffo
- [Getting started](#getting-started)
  - ontributing](#contributing)

  - icense](#license)

## <a name="prerequisites"></a> Prerequisites

Pac
  -  <a name="prerequisites"></a> Prerequisites

Pa
  - a name="prerequisites"></a> Prerequ
- Packages in this seed project depend on `@a
- ckages in this seed project d
- Also, please ensure

## <a name="prerequisites"></a> Prerequisites

Packages in this seed project depend on `@angular v7.x.x`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v3.1.x`** or higher.

## <a name="getting-started"> Getting started

### <a name="installation"> Installation

You can install **`ng-seed/universal`** by simply forking the repo:

```
### <a name="setting-up-the-upstream-repository"> Setting up the upstream repository

Once you have cloned the repo, you can follow these steps to allow sync changes made in this repo with your fork:

`
```

### <a name="setting-up-the-upstream-repository"> Setting up the upstream repository

Once you have cloned the repo, you can follow these steps to allow sync changes made in this repo with your fork:

```

# verify the upstream repo specified for your fork
$ git remote -v
origin    https://github.com/YOUR_USERNAME/[your-fork-repo].git (fetch)
origin    https://github.com/YOUR_USERNAME/[your-fork-repo].git (push)
upstream  https://github.com/ng-seed/universal.git (fetch)
upstream  https://github.com/ng-seed/universal.git (push)

# initial push for the fork
$ git push
```

Now, you can create a new directory (_ex: `src/app/shared`_) to build your codebase out, while benefiting from the
client framework located at the `src/app/framework` directory.

In
```

Now, you can create a new directory (_ex: `src/app/shared`_) to build your codebase out, while benefiting from the
client framework located at the `src/app/framework` directory.

In order to merge the latest upstream changes, simply follow:

```
```

then handle any conflicts, and go on with building your app.

### <a name="development-builds"> Development and builds

B
```

then handle any conflicts, and go on with building your app.

### <a name="development-builds"> Development and builds

Below are the scripts to dev, build, and test this seed project:

#### Install dependencies

```

```
# d
```

#### Development servers

```

# dev server (AoT compilation)
$ yarn start:prod

# dev server (SSR)
$ yarn start:ssr

# dev server (SSR & AoT compilation)
$ yarn start:ssr:prod
```

#### Build

```
# d
```

#### Build

```

# development build (SSR)
$ yarn build:ssr

# production build (SSR)
$ yarn build:ssr:prod
```

The build artifacts will be stored in the `dist/` directory.

#### Running tests

`
```

The build artifacts will be stored in the `dist/` directory.

#### Running tests

```
```

### <a name="cli-scaffolding"> CLI Scaffolding

The project currently performs **CLI scaffolding** using the official `@schematics/angular` collection and `@ngrx/schematics`
col
```

### <a name="cli-scaffolding"> CLI Scaffolding

The project currently performs **CLI scaffolding** using the official `@schematics/angular` collection and `@ngrx/schematics`
collection.

`@schematics/angular` blueprints :

- class
- component
- directive
- enum
- guard
- interface
- module
- pipe
- service

#### Example

```
`@ngrx/schematics` blueprints :

- action
- c
```

`@ngrx/schematics` blueprints :

- action
- container
- effect
- entity
- feature
- reducer
- store

##### Initial store setup

```
# add root state interface
# ng g i store/state
# CREATE src/app/store/state.ts (27 bytes)
```

##### Feature store module setup

```
```

##### Feature store module setup

```
# add reducer `store/todo/todo`
$ ng g r store/todo/todo --spec false
# CREATE src/app/store/todo/todo.reducer.ts (247 bytes)

# add entity `store/todo/item/Item`
$ ng g en store/todo/item/Item -m ../../todo/todo.module.ts
--reducers ../../store/todo.reducer.ts
# CREATE src/app/store/todo/item/item.actions.ts (2078 bytes)
# CREATE src/app/store/todo/item/item.model.ts (40 bytes)
# CREATE src/app/store/todo/item/item.reducer.ts (1746 bytes)
# CREATE src/app/store/todo/item/item.reducer.spec.ts (322 bytes)
# UPDATE src/app/store/todo/todo.module.ts (340 bytes)

# add effects `store/todo/item/Item`
$ ng g ef store/todo/item/Item -m +todo/todo.module.ts
# CREATE src/app/store/todo/item/item.effects.ts (183 bytes)
# CREATE src/app/store/todo/item/item.effects.spec.ts (577 bytes)
# UPDATE src/app/store/todo/todo.module.ts (489 bytes)

# add service `store/todo/Item`
$ ng g s store/todo/Item
# CREATE src/app/store/todo/item/item.service.spec.ts (323 bytes)
# CREATE src/app/store/todo/item/item.service.ts (133 bytes)
```

##### Container & child components setup

```
# a
```

##### Container & child components setup

```
$ ng g co +todo/item/item-container --flat --state ../../store/todo/item/item.reducer.ts
# CREATE src/app/+todo/item/item-container.component.html (33 bytes)
# CREATE src/app/+todo/item/item-container.component.ts (432 bytes)
# CREATE src/app/+todo/item/item-container.component.scss (0 bytes)
# CREATE src/app/+todo/item/item-container.component.spec.ts (884 bytes)
# UPDATE src/app/+todo/todo.module.ts (829 bytes)

# add child component `+todo/item`
$ ng g c +todo/item -c OnPush
# CREATE src/app/+todo/item/item.component.html (23 bytes)
# CREATE src/app/+todo/item/item.component.spec.ts (614 bytes)
# CREATE src/app/+todo/item/item.component.ts (262 bytes)
# CREATE src/app/+todo/item/item.component.scss (0 bytes)
# UPDATE src/app/+todo/todo.module.ts (829 bytes)

# add container component `+todo/item/item-detail/item-detail-container`
$ ng g co +todo/item/item-detail/item-detail-container --flat --state ../../../store/todo/item/item.reducer.ts
# CREATE src/app/+todo/item/item-detail/item-detail-container.component.html (40 bytes)
# CREATE src/app/+todo/item/item-detail/item-detail-container.component.ts (462 bytes)
# CREATE src/app/+todo/item/item-detail/item-detail-container.component.scss (0 bytes)
# CREATE src/app/+todo/item/item-detail/item-detail-container.component.spec.ts (927 bytes)
# UPDATE src/app/+todo/todo.module.ts (946 bytes)

# add child component `+todo/item-detail`
$ ng g c +todo/item/item-detail -c OnPush
# CREATE src/app/+todo/item/item-detail/item-detail.component.html (30 bytes)
# CREATE src/app/+todo/item/item-detail/item-detail.component.spec.ts (657 bytes)
# CREATE src/app/+todo/item/item-detail/item-detail.component.ts (289 bytes)
# CREATE src/app/+todo/item/item-detail/item-detail.component.scss (0 bytes)
# UPDATE src/app/+todo/todo.module.ts (946 bytes)
```

## <a name="directory-structure"></a> Directory structure

We use the **component approach** in this seed project, which is a _standard for developing Angular apps_ and also a great
way
```

## <a name="directory-structure"></a> Directory structure

We use the **component approach** in this seed project, which is a _standard for developing Angular apps_ and also a great
way to ensure maintainable code by encapsulation of our behavior logic.

A component is basically a self contained app usually in a single file or a directory with each concern as a file: _style_,
_template_, _specs_, and _component class_.

> As an old convention, we use the **`+` prefix** for _lazy-loaded_ modules. Please keep in mind that it does not change
> the _router behavior_, neither makes the directory _unworkable_. It's just a handy _method_ to **identify lazy-loaded modules**
> by having a straight look at the directory structure.

```
|
├──.github/                        * issue & pr templates
├──coverage/                       * test coverage reports
|
├──dist/                           * output directory to extract bundles
|  ├──browser/                     * browser bundles
|  └──server/                      * server bundles
|
├──node_modules/                   * dependencies
|
├──src/
|   ├──app/                        * application code
|   |   ├──+lazy-module/           * some LAZY module (attn to the `+` prefix for lazy-loaded modules)
|   |   |  ...
|   |   ├──framework/              * client framework
|   |   ├──layout/                 * layout (app module)
|   |   ├──library/                * application library (models, services, state management, etc.)
|   |   ├──login/                  * login (app module)
|   |   ├──shared/                 * shared codebase
|   |   └──store/                  * state (ngrx) module
|   └──assets/                     * static assets (scss, img, json, etc.)
|   └──environments/               * environment settings
|
├──tools/
|   ├──build/                      * build config and scripts (webpack, etc.)
|   ├──config/                     * config files for static-assets (stylelint, etc.)
|   └──test/                       * test config
|
├──.gitignore                      * GIT settings
├──.jshintrc                       * jshint config
├──angular.json                    * Angular CLI config
├──CHANGELOG.md                    * change log
├──CODE_OF_CONDUCT.md              * code of conduct
├──CONTRIBUTING.md                 * contributing info
├──LICENSE                         * software license
├──package.json                    * deps management
├──README.md                       * project information
├──server.ts                       * server code
├──stylelint.config.js             * stylelint config locator
├──test-report.xml                 * JUNIT test results
├──tsconfig.json                   * typescript config
├──tsconfig.server.json            * typescript config (for server build)
├──tsconfig.server-compile.json    * typescript config (for server compilation)
├──tsconfig.spec.json              * typescript config (for unit/e2e tests)
├──tslint.json                     * tslint config
└──yarn.lock                       * deps lockfile
```

## <a name="contributing"></a> Contributing

If you want to file a bug, contribute some code, or improve documentation, please read up on the following contribution guidelines:

```

## <a name="contributing"></a> Contributing

If you want to file a bug, contribute some code, or improve documentation, please read up on the following contribution guidelines:

- ## Thanks to

- [JetBrains], for their s
- - [JetBrains], for their support to this o
- [Coding rules](CONTRIBUTING.md#rules)
- ## <a name="license"></a>

#### Thanks to

- [opyright ], for their support to this open source project with free [rx-power] licenses.

## <a name="license"></a> License

The MIT License (MIT)

Copyright (c) 2018 [://cli.angu]

[angular]: https://angular.io
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
[ngrx/store]: https://github.com/ngrx/platform
[ngrx/entity]: https://github.com/ngrx/platform/tree/master/docs/entity
[ngrx/effects]: https://github.com/ngrx/platform/blob/master/docs/effects/README.md
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
[nightmare]: https://github.com/segmentio/nightmare
[circleci]: https://circleci.com
[angular-tslint-rules]: https://github.com/ng-seed/angular-tslint-rules
[tslint]: https://github.com/palantir/tslint
[codelyzer]: https://github.com/mgechev/codelyzer
[jetbrains]: https://www.jetbrains.com/community/opensource
[webstorm]: https://www.jetbrains.com/webstorm
[burak tasci]: https://github.com/fulls1z3
