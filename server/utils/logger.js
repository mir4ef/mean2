'use strict';

/* eslint no-console: ["error", { allow: ["log"] }] */

const chalk = require('chalk');
const config = require('../config');

/**
 * @constructor
 * @description print to the console/system logs based on the type of event and write in colors for easy identification
 * @param {String} type - The type of message to be printed (e.g. info, error, etc.)
 * @param {String} message - the message to be printed
 */
function logger(type, message = 'Nothing passed to write to the logs...') {
  switch (type) {
    case 'info':
      console.log(chalk.green(`${new Date()}: INFO:`, message));
      break;
    case 'error':
      console.log(chalk.red.bgBlack.bold(`${new Date()}: ERROR:`, message));
      break;
    case 'debug':
      if (config.debug) {
        console.log(chalk.cyan.dim(`${new Date()}: DEBUG:`, message));
      }
      break;
    case 'warn':
      console.log(chalk.magenta.bold(`${new Date()}: WARN:`, message));
      break;
    default:
      console.log(chalk.dim(`${new Date()}: ???:`, message));
      break;
  }
}

// export the logger for consumption by other modules/files
exports.logger = logger;
