'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * @method validateToken
 * @description Handler to validate a token or block users from accessing protected routes
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The method allowing the application to continue
 * @returns {void} Returns either an error message or allows the user to continue to protected routes
 */
function validateToken(req, res, next) {
  // check header, url parameters or post parameters for token
  const token = req.body.token || req.params.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verify secret and check expiration
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({ success: false, message: 'Failed to authenticate token!' });
      }

      // if everything is good, save the request to be used by other routes
      req.decoded = decoded;

      // allow the users to continue to the protected routes
      next();
    });
  } else {
    // if there is no token, return an HTTP response of 403 (forbidden) and an error message
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
}

exports.validateToken = validateToken;
