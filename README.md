# (M)EAN Stack with Angular 2+ Starter

[![Known Vulnerabilities](https://snyk.io/test/github/mir4ef/mean2/badge.svg)](https://snyk.io/test/github/mir4ef/mean2)
[![dependencies Status](https://david-dm.org/mir4ef/mean2/status.svg)](https://david-dm.org/mir4ef/mean2)
[![devDependencies Status](https://david-dm.org/mir4ef/mean2/dev-status.svg)](https://david-dm.org/mir4ef/mean2?type=dev)
[![GitHub version](https://badge.fury.io/gh/mir4ef%2Fmean2.svg)](https://badge.fury.io/gh/mir4ef%2Fmean2)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

This is a starting point for (M)EAN stack applications (with Angular 2+, _currently 5.0.x_). MongoDB drivers are not setup as part of this boilerplate, but can easily be added (with `mongoose` or some other package). The idea is to have a setup to get you up and running quickly and to be database agnostic. You can easily add a database driver that fits your needs.

_This project is similar to [mea2n](https://github.com/mir4ef/mea2n), but is with `scss` rather than `less`_

## TL;DR

You need:

1. [NodeJS](https://nodejs.org/) v6.9.0+
1. [Angular CLI](https://cli.angular.io) v1.0.0+ (`npm install -g @angular/cli`)

Run the app:

1. Generate certs and place them inside `/server/certs`. Generate certs by running this in your terminal `openssl req -x509 -newkey rsa:4096 -keyout ng2-development.key -out ng2-development.pem -days 365`. If the folder `certs` doesn't exist, create it.
1. Run `npm install`
1. Run `npm run build`
1. Start the server with*:

    ```bash
    NODE_ENV="development" SECRET="your.super.secret" CERTPHRASE="your.cert.password" node server.js
    ```
    
    *If you didn't setup a certificate password, you can omit `CERTPHRASE`.
    
1. Navigate to `https://localhost:8080`


## Not TL;DR

## Table of Contents
1. [What it has](#what-it-has)
1. [Setup](#setup)
    1. [Prerequisites](#prerequisites)
    1. [Prod and Dev](#prod-and-dev)
1. [Development Server](#development-server)
    1. [Node Server](#node-server)
    1. [Lite Server](#lite-server)
1. [Code Scaffolding](#code-scaffolding)
1. [Documentation](#documentation)
    1. [Application Documentation](#application-documentation)
    1. [API Documentation](#api-documentation)
    1. [CSS Documentation/Living Style Guide](#css-documentation)
1. [Build](#build)
1. [Running Unit Tests](#running-unit-tests)
1. [Running end-to-end Tests](#running-end-to-end-tests)
1. [Linting](#linting)
1. [Notes](#notes)
1. [Further help](#further-help)

<a name="what-it-has"></a>
## What it has
- Angular (v5.0.x) and Angular CLI 1.5.x
- NodeJS (+ExpressJS)
- JWT-based authentication (naive, but can be modified and scaled to fit your needs)
- HTTP/2 (thru [spdy](https://github.com/spdy-http2/node-spdy))
- gzip compression of served files/data (thru [compression](https://github.com/expressjs/compression), for more info see [Notes](#notes) below)
- API Docs (thru [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [Swagger UI](http://swagger.io/swagger-ui/), for more info see [API Documentation](#api-documentation) below)
- App Docs (thru [TypeDoc](http://typedoc.org), for more info see [Application Documentation](#application-documentation) below)
- CSS Docs/Style Guide (thru [kss-node](https://github.com/kss-node/kss-node), for more info see [CSS Documentation/Living Style Guide](#css-documentation) below)
- `SCSS` as a style preprocessor
- git `pre-commit` and `pre-push` hooks (for more info see [Notes](#notes) below)
- secured with [helmet](https://helmetjs.github.io) and [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) (for more info see [Node Server](#node-server) below)
- additional security checks thru the [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security) plugin and the [nsp](https://www.npmjs.com/package/nsp) package, which checks your dependencies for known vulnerabilities
- lazy loading of modules with selective preloading strategy to allow you to preload any module you or your app will need (for more info see [Notes](#notes) below) 
- taking advantage of the new `HttpClientModule` and `HttpInterceptor` introduced in Angular 4.3.x (for more info see [Notes](#notes) below)
- analyze the application bundle with [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) (for more info see [Notes](#notes) below)
- `ChromeHeadless` is used for the UTs (for more info see [Notes](#notes) below)

<a name="setup"></a>
## Setup

<a name="prerequisites"></a>
#### Prerequisites

- NodeJS is required (v >= **6.9.0**). It can be downloaded and installed from [here](https://nodejs.org/).

- Angular CLI is required (v >= **1.0.0**). It can be downloaded and installed by running `npm install -g @angular/cli`.
Note: The `-g` flag will install it globally and requires admin (`sudo`) rights for the current user.

- Nodemon is optional. It is used to automatically restart/reload the server on changes to the backend. It can be downloaded and installed by running `npm install -g nodemon`. Then, you can just run the server by going to the application folder and typing `nodemon server.js`.
Note: The `-g` flag will install it globally and requires admin (`sudo`) rights for the current user.

<a name="prod-and-dev"></a>
#### Prod and Dev

- if you are using Ubuntu or RedHat, you need to install the `build-essential`s
- clone the application (you need `git` installed to do it)
- install all dependencies, including the development ones, by running `npm install` from the application folder

<a name="development-server"></a>
## Development server

<a name="node-server"></a>
#### Node server

To run the application with the node server during local development and build/consume APIs and the app/UI do the following:

- generate certificates and place them in the `certs` folder (`app-root-folder/server/certs`) for local development. Please note that the certificate name should match the application name and the current environment (e.g. `app-name-development`, `app-name-production`, etc.). If you don't know how to generate `.pem` and `.key` files, you can search the internet or [read this post](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/) or run this in your terminal `openssl req -x509 -newkey rsa:4096 -keyout app-name-development.key -out app-name-development.pem -days 365` (please use 2048 encryption and above when generating the certs, e.g. `rsa:2048`). If you setup a password for your certs, you will need to provide it when you start the server with the environmental variable `CERTPHRASE`
- if you use the default port configuration, the url will be `https://localhost:8080`. If you are using a different port (by setting the environmental variable `PORT` when you start the server), update the URL accordingly. Note that `http` will work as well, but the connection will be downgraded to `http/1.1`. However, if the environment is set to `production`, it will redirect any `http` calls to `https`. This can be changed in the `server.js` file to fit your needs. The non-secure server runs on port 8081 by default and the URL is `http://localhost:8081`. This can be controlled by setting the environment variable `HTTP_PORT`.
- if you want to enable `debug` mode to see more verbose output in the console, please set `APP_DEBUG="true"` when you start the server
- when you start the server, your final startup command should look something like this:

    ```bash
    NODE_ENV="development" CERTPHRASE="myphrase" SECRET="somesecret" APP_DEBUG="true" node server.js
    ```
    
    or if using `nodemon`
    
    ```bash
    NODE_ENV="development" CERTPHRASE="myphrase" SECRET="somesecret" nodemon server.js
    ```
    
    _You can start the application using the `cluster.js` file instead of `server.js`. This will start as many node instances/processes (or a `cluster`) as the # of CPU cores on your machine/server. You can modify the cluster settings in that file._
    
    Available environmental variables (feel free to add/modify/remove to fit your needs)
    
    | Env Variable     | Type                | Description                                                                                                          | Default       |
    | ---------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------- |
    | `PORT`           | `integer`           | the port the node server https (secure) will be listening on                                                         | `8080`        |
    | `HTTP_PORT`      | `integer`           | the port the node http (non-secure) server will be listening on                                                      | `8081`        |
    | `NODE_ENV`       | `string`            | the server environment                                                                                               | `development` |
    | `CERTPHRASE`     | `string`            | the certificate password if there is one                                                                             | `undefined`   |
    | `SECRET`         | `string`            | the secret to encode/decode the generated token                                                                      | `undefined`   |
    | `APP_DEBUG`      | `string`            | prints verbose output in the console                                                                                 | `false`       |
    | `MAX_REQUESTS`   | `integer`           | how many requests are allowed per window from a single IP address before it is blocked                               | `300`         |
    | `WINDOW_MINUTES` | `integer`           | how many minutes should the requests window be                                                                       | `30`          |
    | `TRUST_PROXY`    | `string`            | set to `true` if the server will be running behind a load balancer or reverse proxy (important for the rate limiter) | `false`       |
    | `ALLOW_CORS`     | `string`            | set to `true` if you want to allow `Cross Origin` requests to the server                                             | `false`       |
    | `DBURL`          | `string`            | the database url/host                                                                                                | `undefined`   |
    | `DBPORT`         | `string`            | the database port                                                                                                    | `undefined`   |
    | `DBUSER`         | `string`            | the database username                                                                                                | `undefined`   |
    | `DBPASS`         | `string`            | the database password associated with the username specified for `DBUSER`                                            | `undefined`   |
    | `DBNAME`         | `string`            | the database name that you will be connecting to                                                                     | `undefined`   |


**Note 1**: You need to build the application before trying to open it in a browser. To do so you can run `npm run build`. 

**Note 2**: The sever has a rate limiter. The default is 300 requests per 30 minutes per user. You can control these settings by setting the environmental variables `MAX_REQUESTS` (integer - e.g. `100` for 100 requests per window) and/or `WINDOW_MINUTES` (integer - e.g. `5` for 5 minutes windows) when you start your sever. 

<a name="lite-server"></a>
#### Lite server

If you want, you can run the client side separately from node with `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the client side source files. To run the app with a secure connection (`https`) please use the `--ssl` flag - `ng server --ssl` (or simply run `npm start`) - and change the protocol to `https` - `https://localhost:4200/`. It is **recommended** to run it with the secure flag to be closer to the prod env, which uses the secure protocol.

**Note**: If you want to listen for client side changes and auto build the client side and still use the node URL, you can use `npm run build:watch`, but this won't auto refresh the browser.

<a name="code-scaffolding"></a>
## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

<a name="documentation"></a>
## Documentation

<a name="application-documentation"></a>
#### Application Documentation

Run `npm run docs:app` to generate the documentation. Start the server and navigate to `http://localhost:port/documentation/app`.

The application documentation is generated using [TypeDoc](http://typedoc.org).

<a name="api-documentation"></a>
#### API Documentation

Run `npm run docs:api` to generate the documentation. Start the server and navigate to `http://localhost:port/documentation/api`. Run `npm run docs:api:watch` to watch and automatically generate the documentation on changes. The swagger definitions can be set in the `swagger.def.js` file located under the `server` folder.

The API documentation is generated with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and visualized with [Swagger UI](http://swagger.io/swagger-ui/).

**Note**: If you are using the `lite server` to view the documentation, the 'Try it out!' button will return errors (`404`s). If you want to use the button, it is recommended to view the docs using the node server URL.

<a name="css-documentation"></a>
#### CSS Documentation/Living Style Guide

Run `npm run docs:css` to generate the documentation. Start the server and navigate to `http://localhost:port/documentation/css`.

The CSS documentation is generated using [kss-node](https://github.com/kss-node/kss-node).

<a name="build"></a>
## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `npm run build:prod` for a production build.

<a name="running-unit-tests"></a>
## Running Unit Tests

Run `npm run test:ng` to execute the client side unit tests via [Karma](https://karma-runner.github.io).

Run `npm run test:node` to execute server side unit tests via [Jasmine](https://jasmine.github.io).

Use `npm test` to run all unit tests at once and generate code coverage reports for both.

<a name="running-end-to-end-tests"></a>
## Running end-to-end Tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

<a name="linting"></a>
## Linting

Run `npm run lint` to lint your code. It will scan the CSS (`SCSS`), the TypeScript (client side) and the JavaScript (server side) files.

<a name="notes"></a>
## Notes

 - The project is setup with Angular 5.0.x.
 - The project is setup with TypeScript 2.6.x, but the recommended version by Angular is 2.4.x. You should be OK with using v2.6.x, but if you run into a problem, you can downgrade TypeScript to v2.4.x.
 - There is one example of using reusable animation with Angular's `animation()` and `useAnimation()` new methods to do fade in effect on route change (only on the first three routes). Most projects have some sort of animation. However, if you plan on not using Angular animations, please remove `@angular/animations` from package.json, `BrowserAnimationsModule` from `app.module.ts`, `NoopAnimationsModule` from any unit test that `imports` it and delete `/src/app/shared/animations`.
 - There is selective preloading strategy to lazy load modules after the initial app download is complete. Any preloaded lazy module will be available when needed. Right now, it preloads the `lazy` module for showcase (see `src/app/app-routing.module.ts`). To have a lazy module preloaded, just add `data: { preload: true }` to the module definition in the `app-routing.module.ts` file.
 - The project has a helper service to make http requests easier and more flexible to use. It takes advantage of the new simplified and improved `HttpClientModule` introduced in Angular 4.3.x (see file `app/core/http/core-http.service.ts`, the file is prefixed with `core` to avoid any confusion/name collision with the Angular http library). It also uses the newly (re)introduced `HttpInterceptor`, which was available in AngularJS 1.x. This project has one interceptor setup to attach the jwt token to the request headers to each api request (see file `app/core/interceptors/token.interceptor.ts`).
 - The project is pre-configured to work with `SCSS`, but if you prefer to use `LESS` or something else, please update the project accordingly to fit your needs.
 - The Node server is configured to gzip each file and api response that it servers to compatible browsers to reduce the file size and save traffic (especially important for mobile devices and slow networks).
 - The Node server has a rate limiter, which uses a simple in-memory store. If you need something more advanced, please use something else like [strict-rate-limiter](https://www.npmjs.com/package/strict-rate-limiter), [express-brute](https://www.npmjs.com/package/express-brute), [express-limiter](https://www.npmjs.com/package/express-limiter).
 - The project has a `pre-commit` hook to perform certain tasks before the code is committed. The base setup only runs the production build and the e2e tests. Feel free to modify it to fit your needs or remove it completely.
 - The project has a `pre-push` hook to perform certain tasks before the code is pushed. The base setup only runs the production build and the e2e tests. Feel free to modify it to fit your needs or remove it completely. (The idea is that during merging or rebasing mistakes might happen and end up in the repo, because merging and rebasing skip `commit` and directly `push`)
 - The project is setup with `@types/jasmine` v2.5.46+, which is a bit more strict, because `any` was replaced with an expected type (`Expected<T>`). If you are encountering problems, please downgrade to v2.4.45 ([more info](https://github.com/angular/angularfire2/issues/875))
 - The project is setup to generate a `stats.json` file with the production build (`build:prod`), which can be read by the [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) and help you analyze the bundle content. It is a useful tool to keep an eye of the application size and decide what can be optimized to reduce the application size (i.e. remove unused angular modules like forms or lazy load a module)
 - The project is setup to use `ChromeHeadless` to execute the unit tests. You need to have Chrome v60+ installed to be able to use it.
 - There are no CSS libraries (e.g. Boostrap, Material, etc.) to give freedom to add any external styling library based on project needs.
 - There are badges at the top of the `README.md` file (this file) for a few metrics like vulnerabilities, dependency version status, etc. Please feel free to add/remove any or all of the badges to suit your needs.

<a name="package-scripts"></a>
## Available Scripts

List of available scripts (feel free to add/modify/remove to fit your needs)

| Script               | Description                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `postinstall`        | runs tasks after `npm install` is completed                                                                                         |
| `start`              | builds the documentations and starts the lite server                                                                                |
| `build`              | builds the documentations and the application                                                                                       |
| `build:prod`         | builds the application for production                                                                                               |
| `build:watch`        | watches for changes to the client side and builds the application                                                                   |
| `test`               | runs all the unit tests (server and client)                                                                                         |
| `test:ng`            | runs the client side unit tests                                                                                                     |
| `test:ng:coverage`   | runs the client side unit tests and produces code coverage report                                                                   |
| `test:node`          | runs the server side unit tests                                                                                                     |
| `test:node:coverage` | runs the server side unit tests and produces code coverage report                                                                   |
| `e2e`                | runs the end-to-end tests                                                                                                           |
| `lint`               | runs all the linting rules (css, javascript, typescript)                                                                            |
| `lint:css`           | runs the css linting rules                                                                                                          |
| `lint:node`          | runs the javascript (server side) linting rules                                                                                     |
| `lint:ts`            | runs the typescript (client side) linting rules                                                                                     |
| `docs`               | creates all the documentation (css, api, app)                                                                                       |
| `docs:app`           | creates the app documentation                                                                                                       |
| `docs:api`           | creates the api documentation                                                                                                       |
| `docs:api:watch`     | watches for changes to the server side and creates the api documentation                                                            |
| `docs:css`           | creates the css documentation                                                                                                       |
| `copy:swagger`       | copy the javascript and css files for the api documentation from the swagger ui dist project                                        |
| `security:scan`      | checks the dependencies in `packages.json` for known vulnerabilities against the [nsp database](https://nodesecurity.io/advisories) |
| `bundle-report`      | reads the `stats.json` file (created by the prod build) to analyze the bundle content                                               |
| `pre-git`            | script run by the git hooks                                                                                                         |

<a name="further-help"></a>
## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get more help on the `swagger-jsdoc` use `./node_modules/swagger-jsdoc/bin/swagger-jsdoc.js -h` or go check out the [swagger-jsdoc README](https://github.com/Surnet/swagger-jsdoc/blob/master/README.md).

To get more help on the `typedoc` use `./node_modules/typedoc/bin/typedoc -h` or go check out the [typedoc README](https://github.com/TypeStrong/typedoc/blob/master/README.md).

To get more help on the `kss-node` use `./node_modules/.bin/kss -h` or go check out the [kss-node README](https://github.com/kss-node/kss-node/blob/master/README.md).
