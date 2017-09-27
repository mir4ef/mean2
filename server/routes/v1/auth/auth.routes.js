'use strict';

const express = require('express');
const controller = require('./auth.controller');

function authRoutes() {
  const router = express.Router();

  router.route('/').post(controller.authPOST);

  return router;
}

exports.authRoutes = authRoutes;
