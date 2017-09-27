'use strict';

/**
 * @method escapeRegExp
 * @description Safely escape characters during replace or other RegEx methods
 * @param {String} str - The string that needs escaping
 * @returns {String} The string with safely escaped characters
 */
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$&');
}

// export the method for consumption by other modules/files
exports.escapeRegExp = escapeRegExp;
