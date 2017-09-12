# Weather Forecast Application

This project demonstrates how to retrieve a 5 day weather forecast for a  selected city using the [API provided by OpenWeatherMap](http://openweathermap.org/forecast5) and display it as a widget on a page.

Used Technologies & Tools:
- [Angular](https://angular.io/)
- [Angular CLI](https://cli.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](http://sass-lang.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Karma](https://karma-runner.github.io/1.0/index.html)
- [Jasmine](https://jasmine.github.io/)
- [Protractor](http://www.protractortest.org/#/)
- [Chai](http://chaijs.com/)
- [Cucumber](https://cucumber.io/)
- [Swagger](https://swagger.io/)
- [Heroku](https://www.heroku.com/)

## Local Development

### Prerequisites

As the project uses an external API which requires an API key for access you need to [sign up](http://openweathermap.org/appid) for one.

Once you have your own API key you need to store it as an environment variable in your system as the backend service relies on it:

```sh
export FORECAST_API_KEY=<Your OpenWeatherMap API Key>
```

### Install

You can install the project dependencies with your favourite package manager ([yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)).

The package manager needs to be installed on your machine.

```sh
# yarn
yarn

# npm
npm install
```

### Development Server

```sh
# yarn
yarn start

# npm
npm start
```

Navigate to http://localhost:4200.

The application will automatically reload if you change any of the source files.

The development server automatically proxies requests to the `Express` backend server which calls the remote `OpenWeatherMap` API.

_Note:_ The application will fail to run properly if you have other applications running at ports _4200_ or _3000_ or if your _PORT_ environment variable is set to other than _3000_ as the proxy configuration uses that exact port.

### Build

The build artifacts will be stored in the `dist/` directory.

Use the `-prod` flag for a production build.

```sh
# yarn
yarn build

# npm
npm run build
```

### Running unit tests

Execute unit tests written in `Jasmine` via `Karma`.

```sh
# yarn
yarn test

# npm
npm test
```

### Running end-to-end tests

Execute end-to-end tests written in `Chai` & `Cucumber` via `Protractor`.

```sh
# yarn
yarn e2e

# npm
npm run e2e
```

### Running the backend server only

Run the `Express` server at the following URL: http://localhost:3000.

Read the `Swagger` [specification](https://github.com/SuNR0N/weather-forecast/blob/master/server/swagger.yaml) to know more about the API contracts in place.

```sh
# yarn
yarn server

# npm
npm run server
```

## Hosted Application

[Weather Forecast Application]() @ `Heroku`

### How to deploy to Heroku

[Detailed Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

1. Create a `Heroku` acccount
2. Install the `Heroku CLI`
3. Login with `Heroku CLI` to your account
```sh
heroku login
```
4. Cd into the root of your project directory
5. Run `create` command
```sh
heroku create
```
6. Change the random generated name of your application
```sh
heroku apps:rename <new-name>
```
7. Create a `postinstall` script which will kick off a production build
```json
"scripts": {
    "postinstall": "ng build --aot -prod"
}
```
8. Move all of those `devDependencies` to `dependencies` which are required to run the application as `Heroku` will install those only:
    - `@angular/cli`
    - `ts-node`
9. Set logic in `Express` to serve static files from `dist/` directory
```typescript
app.use(express.static(__dirname + '../dist'));
```
10. Set `Express` to use the `PORT` environment variable by default for listening if it exists
```typescript
app.listen(process.env.PORT || config.port, () => {
    logger.info(`Server app is listening on port ${process.env.PORT || config.port}!`);
})
```
11. Handle default `PathLocationStrategy` of `Angular` in `Express`
```typescript
import { join } from 'path';
...
app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(join(__dirname + '../dist/index.html'));
});
```
12. Set the API key as an environment variable on `Heroku`
```sh
heroku config:set FORECAST_API_KEY=<Your OpenWeatherMap API Key>
```
13. Push to `Heroku` to deploy the application
```sh
git add .
git commit -m "Deploy to Heroku"
git push heroku master
```

## TODO

- [ ] Improve code coverage
- [ ] Investigate build issues of e2e tests with the latest version of TypeScript
- [ ] Make it more responsive
- [ ] Add some colors and introduce different icons for each weather state
- [ ] Force redirect to HTTPS
- [ ] Enhance Sass code to use color maps and mixins where appropriate
