'use strict';

const logger = require('./logger').logger;

/**
 * @method handleError
 * @description Handler for all application level errors and returns a json with the error message to the caller
 * @param {String} message The error message to be returned with the response
 * @param {Number} code The error code for the server response
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The call back function to allow the application to continue
 * @returns {Object} Object containing the error message
 */
// eslint-disable-next-line no-unused-vars
function handleError({ message = 'An error occurred', code = 500 }, req, res, next) {
  if (message.toLowerCase() === 'request entity too large') {
    // eslint-disable-next-line no-param-reassign
    code = 413;
  }

  logger('error', `error code '${code}' and message '${message}'`);

  return res.status(code).json({ success: false, message });
}

// export the method for consumption by other modules/files
exports.handleErrors = handleError;
