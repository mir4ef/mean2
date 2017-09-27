'use strict';

const logger = require('../../../utils/logger').logger;

// defining some dummy data
// ideally this should come from a database
const sampleEntries = [
  {
    id: 123,
    name: 'Entry 1'
  },
  {
    id: 456,
    name: 'Entry 2'
  },
  {
    id: 789,
    name: 'Entry 3'
  }
];

function sampleEntriesGET(req, res, next) {
  if (sampleEntries.length < 1) {
    logger('error', `no data found`);

    return next({ message: 'no data...', code: 404 });
  }

  return res.json({ success: true, message: sampleEntries });
}

function sampleEntryGET(req, res, next) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    logger('error', `id '${req.params.id}' is not a Number. This should contain more details about the error. The return statement sends a message to the client and the client doesn't need to know every single detail about the error, which might contain sensitive information like db URLs and tables/stored procedures, etc.`);

    return next({ message: `id '${req.params.id}' is not a Number`, code: 400 });
  }

  // find a match
  // ideally this should come from a database
  const entry = sampleEntries.find(elm => elm.id === id);

  if (!entry) {
    logger('error', `id '${id}' did not match any records`);

    return next({ message: `id '${id}' did not match any records`, code: 404 });
  }

  return res.json({ success: true, message: entry });
}

exports.sampleEntriesGET = sampleEntriesGET;
exports.sampleEntryGET = sampleEntryGET;
