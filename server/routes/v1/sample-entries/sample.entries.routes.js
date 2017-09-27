'use strict';

const express = require('express');
const controller = require('./sample.entries.controller');

function sampleEntriesRoutes() {
  const router = express.Router();

  router.route('/').get(controller.sampleEntriesGET);
  router.route('/:id').get(controller.sampleEntryGET);

  return router;
}

exports.sampleEntriesRoutes = sampleEntriesRoutes;
