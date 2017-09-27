'use strict';

// import the route methods
const token = require('../../middleware/validate.token');
const authRoutes = require('./auth/auth.routes').authRoutes();
const sampleDataRoutes = require('./sample-data/sample.data.routes').sampleDataRoutes();
const sampleEntriesRoutes = require('./sample-entries/sample.entries.routes').sampleEntriesRoutes();
const dataRoutes = require('./data/data.routes').dataRoutes();

function apiRoutes(app, express) {
  // get an instance of the express router
  const apiRouter = express.Router();

  /**
   * *************************************************
   * START ROUTES DEFINITIONS
   * *************************************************
   */

  /**
   * UNPROTECTED ROUTES
   */

  // api endpoint for testing
  apiRouter.get('/', (req, res) => res.json({ success: true, message: 'API is working!' }));

  // sample data api endpoint routes
  apiRouter.use('/sampleData', sampleDataRoutes);

  // sample entries api endpoint routes
  apiRouter.use('/sampleEntries', sampleEntriesRoutes);

  // authentication endpoint
  apiRouter.use('/auth', authRoutes);

  // PROTECTED data endpoint
  // Although this endpoint definition is before the validateToken middleware,
  // it has the middleware imported into the dataRoutes routes definitions
  // and it handles the token validation. The idea is to demonstrate a different
  // way of defining and protecting routes. Also, this allows for certain routes
  // not to be protected and others to be protected within the same definition file.
  // Also, this gives more flexibility to the order of routes definition.
  // See './data/data.routes.js' for more info.
  apiRouter.use('/data', dataRoutes);

  /**
   * route middleware to verify a token
   *
   * NOTE: it needs to be after all unprotected and before all protected routes
   * any route before it will NOT be protected by the middleware, so anybody CAN access it
   * any route after it will be protected by the middleware
   */
  apiRouter.use(token.validateToken);

  /**
   * PROTECTED ROUTES
   */

  // api endpoint for testing protected api endpoints
  apiRouter.get('/protected', (req, res) => res.json({ success: true, message: 'protected API is working!' }));

  // api endpoint to get user information
  apiRouter.get('/me', (req, res) => res.json({ success: true, message: req.decoded }));

  /**
   * *************************************************
   * END ROUTES DEFINITIONS
   * *************************************************
   */

  /**
   * Describe the test api endpoints so swagger can generate documentation for them
   */

  /**
   * @swagger
   * /v1/:
   *   get:
   *     summary: Reach unprotected API endpoints
   *     description: An API endpoint for you to make sure you are reaching the server and its unprotected api endpoints (like /authenticate, etc.)
   *     tags: [Endpoints for Testing]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns an object
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *             message:
   *               type: string
   *               example: 'reached API!'
   *       500:
   *         description: server error
   *         schema:
   *           type: object
   *           $ref: '#/definitions/ServerError'
   * /v1/protected:
   *   get:
   *     summary: Reach protected API endpoints
   *     description: An API endpoint for you to make sure you are reaching the server and its protected api endpoints (like /collaborators, etc.)
   *     tags: [Endpoints for Testing]
   *     security:
   *       - APIKey: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns an object
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *             message:
   *               type: string
   *               example: 'reached protected API!'
   *       403:
   *         description: failed to authenticate the supplied token or no token was provided
   *         schema:
   *           type: object
   *           $ref: '#/definitions/FailedToken'
   *       500:
   *         description: server error
   *         schema:
   *           type: object
   *           $ref: '#/definitions/ServerError'
   */

  /**
   * Below are some shared definitions to be used across all routes e.g. server errors, etc.
   */

  /**
   * @swagger
   * definitions:
   *   FailedToken:
   *     properties:
   *       success:
   *         type: boolean
   *         example: false
   *       message:
   *         type: string
   *         example: 'Token not valid or not provided!'
   *
   *   BadRequest:
   *     properties:
   *       success:
   *         type: boolean
   *         example: false
   *       message:
   *         type: string
   *         example: 'Invalid request or parameter passed'
   *
   *   ServerError:
   *     properties:
   *       success:
   *         type: boolean
   *         example: false
   *       message:
   *         type: string
   *         example: 'Server or database error!'
   */

  /**
   * END shared definitions
   */

  // return the /api/v1 routes object
  return apiRouter;
}

// export the apiRoutes object for consumption in other modules
exports.apiRoutes = apiRoutes;
