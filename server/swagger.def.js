'use strict';

const def = {
  swagger: '2.0',
  info: {
    // Title (required)
    title: 'My Title',

    // Version (required)
    version: 'v1',

    // Description (optional)
    description: 'A sample API'
  },

  // Schemes (optional)
  schemes: [ 'https' ],

  // API base path (optional)
  basePath: '/api',

  // Host (optional)
  // host: config.host

  securityDefinitions: {
    APIKey: {
      type: 'apiKey',
      in: 'header',
      name: 'x-access-token'
    }
  }
};

// this configuration settings must be exported with `module.exports` so swagger
// can generate the documentation
// eslint-disable-next-line node/exports-style
module.exports = def;
