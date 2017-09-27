/* eslint-env jasmine */

'use strict';

const sampleDataGET = require('./sample.data.controller').sampleDataGET;

describe('/sampleData Endpoint', () => {
  describe('GET', () => {
    it('should return data with a success flag', () => {
      const sampleData = {
        id: 123,
        title: 'Title',
        bodyText: 'Body text.'
      };
      const req = {
        query: {},
        params: {},
        body: {}
      };
      const res = {
        json: jasmine.createSpy().and.callFake(() => ({ success: true, message: sampleData }))
      };
      const resp = sampleDataGET(req, res);

      expect(resp).toEqual({ success: true, message: sampleData });
      expect(resp.success).toBe(true);
      expect(resp.message).toEqual(sampleData);
    });
  });
});
