# Complete starter seed project for Angular 2

## Minimal Branch

> Featuring Webpack 2 (and Webpack DLL plugin for faster dev builds). Supports Lazy Loading and AOT compilation.

###### You can use npm, but it's recommended to use yarn as it installs a lot faster and has other benefits https://yarnpkg.com/ . Make sure you are using yarn version 0.16.0 or newer (check with 'yarn --version')

```bash
git clone -b minimal https://github.com/qdouble/angular-webpack2-starter.git
cd angular-webpack2-starter
yarn
yarn start
```

### [Material Branch with Universal (Server-side rendering) support](https://github.com/qdouble/angular-webpack2-starter)

### [Material Branch without Universal (Server-side rendering) support](https://github.com/qdouble/angular-webpack2-starter/tree/no-universal-support)

### [Bootstrap and Universal Branch](https://github.com/qdouble/angular-webpack2-starter/tree/bootstrap-and-universal)

### [Bootstrap Branch](https://github.com/qdouble/angular-webpack2-starter/tree/bootstrap)

## Features

* Angular 2
  * Async loading
  * Treeshaking
  * AOT (Ahead of Time/ Offline) Compilation
* Webpack 2
  * Webpack Dlls (Speeds up devServer builds)
* TypeScript 2
  * @types
* Karma/Jasmine testing
* Protractor for E2E testing

## Project Goals

* The main goal is to provide an environment where you can have great dev tools and create a production application without worrying about adding a bunch of stuff yourself.
* The goal of your design should be so that you can easily copy and paste your app folder and your constants file into to a new update of this project and have it still work. Use constants and have proper separation to make upgrades easy. If you have any suggestions on areas where this starter can be designed to make updates more easy, file an issue.

## Basic scripts

Use `yarn start` for dev server. Default dev port is `3000`.

Use `yarn run build` for production build.

Use `yarn run server:prod` for production server and production watch. Default production port is `8088`.

Default ports and option to use proxy backend for dev server can be changed in `constants.js` file.

To create AOT version, run `yarn run compile`. This will compile and build script.
Then you can use `yarn run prodserver` to see to serve files.
Do not use build:aot directly unless you have already compiled.
Use `yarn run compile` instead, it compiles and builds:aot

### AOT  Don'ts

The following are some things that will make AOT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

### Testing

For unit tests, use `yarn run test` for continuous testing in watch mode and use
`yarn run test:once` for single test. To view code coverage after running test, open `coverage/html/index.html` in your browser.

For e2e tests, use `yarn run e2e`. To run unit test and e2e test at the same time, use `yarn run ci`.

### Wiki Links

[Recommended Steps for merging this starter into existing project](https://github.com/qdouble/angular-webpack2-starter/wiki/Recommended-Steps-for-Merging-Starter-into-Existing-Project)

### License

[MIT](https://github.com/qdouble/angular-webpack2-starter/blob/minimal/LICENSE)
