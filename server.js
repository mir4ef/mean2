'use strict';

// load the packages
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const spdy = require('spdy');
const config = require('./server/config');
const errors = require('./server/utils/errors');
const redirect = require('./server/utils/redirect.http');
const logger = require('./server/utils/logger').logger;
const apiRoutesV1 = require('./server/routes/v1/api').apiRoutes(app, express);
const options = {
  key: fs.readFileSync(`server/certs/ng2-${config.env}.key`),
  cert: fs.readFileSync(`server/certs/ng2-${config.env}.pem`),
  passphrase: config.certphrase,
  secureOptions: crypto.constants.SSL_OP_NO_TLSv1
};
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
  // minutes window to track requests (default 30)
  windowMs: Number.parseInt(config.windowMs, 10) * 60 * 1000,

  // limit each IP to maximum requests per windowMs (default 300)
  max: Number.parseInt(config.maxRequests, 10),

  // disable delaying - full speed until the max limit is reached
  delayMs: 0
});

// add the CA for non development environments e.g. test, production, etc.
if (config.env !== 'development') {
  options.ca = [
    fs.readFileSync('server/certs/certificateca.cer')
  ];
}

logger('debug', `##############################`);
logger('debug', `###     DEBUG ENABLED     ####`);
logger('debug', `##############################`);

// print if debugging logs are enabled and log all requests to the console
if (config.debug) {
  app.use(morgan('dev'));
}

// enable when you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
if (config.trustProxy) {
  app.enable('trust proxy');
  logger('info', `trust proxy enabled!`);
}

// protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet());

// compress static files (JavaScript, CSS)
// MUST BE PLACED BEFORE DEFINING THE STATIC FILES FOLDER/PATH!!!
app.use(compress());

// apply rate limiter to all requests
app.use(limiter);

// use body parser to get info from POST requests
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));

// for parsing application/json
app.use(bodyParser.json({ limit: '2mb' }));

// redirect all non-secure (http) traffic to https on production
if (config.env === 'production') {
  app.use(redirect.redirectToHTTPS);
}

// handle CORS requests
app.use(cors({
  origin: config.allowCORS,
  methods: [ 'GET, POST' ],
  allowedHeaders: [ 'X-Requested-With', 'Content-Type' ],

  // Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.
  optionsSuccessStatus: 200
}));

// warn if Cross Origin requests are allowed
if (config.allowCORS) {
  logger('warn', 'Cross Origin Enabled!');
}

// set the public folder to serve public assets the frontend will request
app.use(express.static('dist'));

// all the routes will be prefixed with /api
app.use('/api/v1', apiRoutesV1);

// error handling
app.use(errors.handleErrors);

// catch all routes and send the user to the frontend
// has to be registered after API ROUTES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// start the server
spdy.createServer(options, app).listen(config.port, () => {
  logger('info', `The server has been started on port ${config.port}`);
  logger('info', `The environment is ${config.env}`);
});

// start the non-secure server to accept http traffic and redirect it to https
app.listen(config.httpPort, () => {
  logger('info', `HTTP server has been started on port ${config.httpPort}`);
  logger('info', `HTTP environment is ${config.env}`);
});
