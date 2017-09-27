'use strict';

const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const specReporter = new SpecReporter({
  suite: {
    displayNumber: true
  },
  spec: {
    displayPending: true,
    displayErrorMessages: true,
    displaySuccessful: true,
    displayFailed: true,
    displayDuration: true
  },
  summary: {
    displayErrorMessages: true,
    displayFailed: true,
    displayDuration: true
  }
});

// load the jasmine config file
jasmine.loadConfigFile('server/jasmine/support/jasmine.json');

// clear any reporters (including the default one)
jasmine.clearReporters();

jasmine.onComplete(function(passed) {
  if (passed) {
    console.log('All specs have passed');
  } else {
    console.log('At least one spec has failed');
  }
});

// add/load the spec reporter
jasmine.addReporter(specReporter);

// run the unit tests
jasmine.execute();
