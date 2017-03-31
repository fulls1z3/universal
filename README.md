# @nglibs universal example application

Example application showcasing both **Angular Universal** and lean **Angular** on a single project, with common patterns and best practices. You can find the live app [here](https://nglibs-universal-example-app.azurewebsites.net).

This application uses `platform-server` delivered with **Angular 4.0.0**, and it could be a good starter project until **Angular** provides some documentation about the use of `platform-server`. 

Furthermore, it covers most of the features of [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter/) by [AngularClass](https://github.com/AngularClass) such as async/**lazy** routes, **SCSS** compilation (*both inline and external*), dev/prod modes, **AoT** compilation via `@ngtools/webpack`, tests, TsLint/Codelyzer, @types and maybe more.         

Built with `@angular v4.0.0`, bundled with `gulp v4.0` and `webpack v2.3.1`.

## Prerequisites
Packages in this example app depend on `@angular v4.0.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.2.1`** or higher.

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
