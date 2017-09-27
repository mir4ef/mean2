'use strict';

const logger = require('../../../utils/logger').logger;
const user = {
  id: 123,
  name: 'First Last',
  username: 'first.last'
};

function dataGET(req, res, next) {
  if (!user) {
    logger('error', `no data found`);

    return next({ message: 'no data...', code: 404 });
  }

  return res.json({ success: true, message: user });
}

exports.dataGET = dataGET;
