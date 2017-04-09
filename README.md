# @nglibs universal example application

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

Example application showcasing both **server-side rendering** (*Angular Universal*) and **client-side rendering** (*lean Angular*) on a single project, with common patterns and best practices. You can find the live app [here](https://nglibs-universal-example-app.azurewebsites.net).

This application uses [@nglibs/config](https://github.com/nglibs/config) to fetch the configuration settings loaded during application initialization; [@nglibs/meta](https://github.com/nglibs/meta) to update the page title & meta tags every time the route changes; [@nglibs/i18n-router](https://github.com/nglibs/i18n-router) to intercept Router initialization and translates each `path` and `redirectTo` property of Routes; [@nglibs/i18n-router-config-loader](https://github.com/nglibs/i18n-router-config-loader) to load route translations using `@nglibs/config`.

Furthermore, it uses `platform-server` delivered with **Angular 4.0.0** and covers most of the features of [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter/) by [AngularClass](https://github.com/AngularClass) such as async/**lazy** routes, **SCSS** compilation (*both inline and external*), dev/prod modes, **[AoT compilation]** via `@ngtools/webpack`, tests, TsLint/Codelyzer, @types and maybe more.         

Built with `@angular v4.0.0`, bundled with `gulp v4.0` and `webpack v2.3.3`.

## Included

- [@nglibs/config]
- [@nglibs/meta]
- [@nglibs/i18n-router]
- [@nglibs/i18n-router-config-loader]
- [@nglibs/universal-express-engine]
- [@nglibs/universal-transfer-state]
- [@ngx-translate](https://github.com/ngx-translate/core)

## Prerequisites
Packages in this example app depend on `@angular v4.0.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.1.6`** or higher.

## Installing

```
# clone the repo
git clone https://github.com/nglibs/universal-example-app.git
cd universal-example-app

# use npm (or yarn) to install the dependencies
npm install

# dev build (SPA / lean Angular)
npm run build:spa-dev
# prod build (SPA / lean Angular)
npm run build:spa-prod

# start the server (SPA / lean Angular)
npm run serve:spa

# dev build (Universal)
npm run build:universal-dev
# prod build (Universal)
npm run build:universal-prod

# start the server (Angular Universal)
npm run serve
```

Navigate to `http://localhost:1337` for **SPA** (*lean Angular*) and `http://localhost:8000` for **Angular Universal** in your browser.

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[Burak Tasci]: http://www.buraktasci.com

[@nglibs/config]: https://github.com/nglibs/config
[@nglibs/meta]: https://github.com/nglibs/meta
[@nglibs/i18n-router]: https://github.com/nglibs/i18n-router
[@nglibs/i18n-router-config-loader]: https://github.com/nglibs/i18n-router-config-loader
[@nglibs/universal-express-engine]: https://github.com/nglibs/universal-express-engine
[@nglibs/universal-transfer-state]: https://github.com/nglibs/universal-transfer-state
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[Burak Tasci]: http://www.buraktasci.com
