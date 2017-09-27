'use strict';

const express = require('express');
const controller = require('./sample.data.controller');

function sampleDataRoutes() {
  const router = express.Router();

  router.route('/').get(controller.sampleDataGET);

  return router;
}

exports.sampleDataRoutes = sampleDataRoutes;
