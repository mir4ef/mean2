'use strict';

/**
 * @description Handler for HTTP request to redirect them to HTTPS
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The call back function to allow the application to continue
 * @return {void} HTTP redirect to HTTPS or continues if the request was secure
 */
exports.redirectToHTTPS = (req, res, next) => {
  if (!req.secure) {
    // request was via http, so redirect to https with http status code of `301`
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }

  // request was via https, so do no special handling
  next();
};
