'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../../config');
const logger = require('../../../utils/logger').logger;
const user = {
  id: 123,
  name: 'First Last',
  username: 'first.last'
};

/**
 * @method generateToken
 * @description Method to generate and sign a token
 * @param {Object} res - The response object used to send the response
 * @param {Object} appUser - Object containing some information about the user e.g. name, username, etc.
 * @returns {Object} Returns object containing the token and a success flag
 */
function generateToken(res, appUser) {
  const token = jwt.sign({
    name: appUser.name,
    username: appUser.username
  }, config.secret, {
    expiresIn: '15h'
  });

  // return the information including a token as JSON
  return res.json({
    success: true,
    message: `User ${appUser.name} authenticated successfully!`,
    token
  });
}

/**
 * @swagger
 * definitions:
 *   Authenticate:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       success:
 *         type: boolean
 *         default: true
 *       message:
 *         type: string
 *         example: 'Successfully authenticated!'
 *       token:
 *         type: string
 *         example: 'token.in.jwt.format'
 *
 *   FailedAuthenticate:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       success:
 *         type: boolean
 *         default: false
 *       message:
 *         type: string
 *         example: 'Wrong credentials!'
 *
 *   NotInLDAPGroup:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       success:
 *         type: boolean
 *         default: false
 *       message:
 *         type: string
 *         example: 'User is not part of the LDAP group'
 */

/**
 * @swagger
 * /v1/auth:
 *   post:
 *     summary: Verify user and get a token
 *     description: Login to the application and generate a token
 *     tags: [Authenticate]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: username
 *         description: Username in the format `firstname.lastname`.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful verification of credentials and returns a token
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Authenticate'
 *       400:
 *         description: bad request - a param is missing or invalid
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BadRequest'
 *       401:
 *         description: could not verify credentials
 *         schema:
 *           type: object
 *           $ref: '#/definitions/FailedAuthenticate'
 *       403:
 *         description: The user authenticated successfully, but is not part of the LDAP group to access the application
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NotInLDAPGroup'
 *       500:
 *         description: failed to connect to LDAP or another server error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ServerError'
 */

/**
 * @method authPOST
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function to allow the application to continue
 * @returns {Object} Return successful or failed response
 */
function authPOST(req, res, next) {
  if (!user) {
    logger('error', `invalid login`);

    return next({ message: 'invalid login', code: 401 });
  }

  if (!req.body.username || req.body.username !== 'test') {
    logger('error', `invalid user provided`);

    return next({ message: 'invalid user provided, use test', code: 401 });
  }

  if (!req.body.username || req.body.password !== 'test') {
    logger('error', `invalid password provided`);

    return next({ message: 'invalid password provided, use test', code: 401 });
  }

  return generateToken(res, user);
}

exports.authPOST = authPOST;
