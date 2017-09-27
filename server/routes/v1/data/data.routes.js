'use strict';

const express = require('express');
const token = require('../../../middleware/validate.token');
const controller = require('./data.controller');

function dataRoutes() {
  const router = express.Router();

  /**
   * UNPROTECTED ROUTES
   */

  // the route on line 17 will be unprotected
  // The idea is to demonstrate how you can have protected and unprotected routes in each
  // route definition file.
  // router.route('/:id').get(controller.dataGET);

  /**
   * route middleware to verify a token
   *
   * NOTE: it needs to be after all unprotected and before all protected routes
   * any route before it will NOT be protected by the middleware, so anybody CAN access it
   * any route after it will be protected by the middleware
   */
  router.use(token.validateToken);

  /**
   * PROTECTED ROUTES
   */

  // protected data endpoint
  router.route('/:id').get(controller.dataGET);

  // another way to protect individual routes is to pass the middleware as a first param to
  // the get/post/etc method and the handler/controller as a second. This gives more flexibility
  // to the order of the route definitions, but requires more key strokes :)
  // Example:
  // router.route('/:id').get(token.validateToken, controller.dataGET);

  return router;
}

exports.dataRoutes = dataRoutes;
