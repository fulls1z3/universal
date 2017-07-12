# ng-seed/universal
> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`ng-seed/spa`** is a seed project for Angular Universal apps following the common patterns and [best practices](https://angular.io/styleguide) in file and application organization, providing the following features:

- Ready-to-go build system using [gulp] and [Webpack] for working with [TypeScript].
- Adjustable build configuration via `json` file (`./config/build-config.json`).
- Production and development modes.
- [Webpack DLL]s to speed up development builds.
- [AoT compilation] for rapid page loads on production builds (*using [@ngtools/webpack]*).
- Tree-shaking the production builds with `harmony` branch of [UglifyJs2].
- Hot Module Replacement with [Webpack] and [webpack-hot-middleware].
- Both inline and external SCSS compilation.
- Lazy loading of modules.
- Uses [@ngx-config] for configuration management.
- Uses [@ngx-cache] for caching.
- Uses [@ngx-translate] and [@ngx-i18n-router] for i18n support.
- Uses [@ngx-meta] for SEO.
- ~Unit tests with [Jasmine] and [Karma], including code coverage via [Istanbul].~
- ~End-to-end tests with [Protractor].~
- [angular-tslint-rules] as configuration preset for [TSLint] and [codelyzer].
- Managing the type definitions using @types.

> Built with `@angular v4.2.0`, bundled with `gulp v4.0` and `webpack v3.0.0`.

You can find the live app [here](https://ng-seed-universal.azurewebsites.net).

## Prerequisites
Packages in this seed project depend on `@angular v4.0.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.1.6`** or higher.

## Installing
```
# clone the repo
git clone https://github.com/ng-seed/universal.git
cd universal

# use npm (or yarn) to install the dependencies
npm install

# dev build (SPA / lean Angular)
npm run build:spa-dev
# prod build (SPA / lean Angular)
npm run build:spa-prod

# start the server (SPA / lean Angular)
npm run serve:spa
# start the server (SPA / lean Angular, with HMR support)
npm run serve:spa-hmr

# dev build (Universal)
npm run build:universal-dev
# prod build (Universal)
npm run build:universal-prod

# start the server (Angular Universal)
npm run serve
```

Navigate to `http://localhost:1337` for **lean Angular** (*client-side rendering*) and `http://localhost:8000` for **Angular Universal** (*server-side rendering*) in your browser.

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[gulp]: http://gulpjs.com
[Webpack]: http://webpack.github.io
[TypeScript]: https://github.com/Microsoft/TypeScript
[Webpack DLL]: https://robertknight.github.io/posts/webpack-dll-plugins
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[@ngtools/webpack]: https://www.npmjs.com/package/@ngtools/webpack
[UglifyJs2]: https://github.com/mishoo/UglifyJS2/tree/harmony
[webpack-hot-middleware]: https://github.com/glenjamin/webpack-hot-middleware
[@ngx-config]: https://github.com/ngx-config/core
[@ngx-cache]: https://github.com/ngx-cache/core
[@ngx-translate]: https://github.com/ngx-translate/core
[@ngx-i18n-router]: https://github.com/ngx-i18n-router/core
[@ngx-meta]: https://github.com/ngx-meta/core
[Jasmine]: https://jasmine.github.io
[Karma]: https://karma-runner.github.io
[Istanbul]: https://github.com/webpack-contrib/istanbul-instrumenter-loader
[Protractor]: http://www.protractortest.org
[angular-tslint-rules]: https://github.com/fulls1z3/angular-tslint-rules
[TSLint]: https://github.com/palantir/tslint
[codelyzer]: https://github.com/mgechev/codelyzer
[Burak Tasci]: http://www.buraktasci.com
