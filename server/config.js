'use strict';

/* eslint no-process-env: ["off"] */

module.exports = {
  'port': process.env.PORT || 8080,
  'env': process.env.NODE_ENV || 'development',
  'certphrase': process.env.CERTPHRASE || '',
  'secret': process.env.SECRET,
  'maxRequests': process.env.MAX_REQUESTS || 300,
  'windowMs': process.env.WINDOW_MINUTES || 30,
  'trustProxy': process.env.TRUST_PROXY === 'true',
  'debug': process.env.APP_DEBUG === 'true',
  'allowCORS': process.env.ALLOW_CORS === 'true',
  'dburl': process.env.DBURL,
  'dbport': process.env.DBPORT,
  'dbuser': process.env.DBUSER,
  'dbpass': process.env.DBPASS
};
