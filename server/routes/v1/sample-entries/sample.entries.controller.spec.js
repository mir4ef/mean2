/* eslint-env jasmine */

'use strict';

const sampleEntriesGET = require('./sample.entries.controller').sampleEntriesGET;

describe('/sampleEntries Endpoint', () => {
  describe('GET', () => {
    it('should return data with a success flag', () => {
      const sampleEntries = [
        {
          id: '01',
          name: 'Entry 1'
        },
        {
          id: '02',
          name: 'Entry 2'
        },
        {
          id: '03',
          name: 'Entry 3'
        }
      ];
      const req = {
        query: {},
        params: {},
        body: {}
      };
      const res = {
        json: jasmine.createSpy().and.callFake(() => ({ success: true, message: sampleEntries }))
      };
      const resp = sampleEntriesGET(req, res);

      expect(resp).toEqual({ success: true, message: sampleEntries });
      expect(resp.success).toBe(true);
      expect(resp.message).toEqual(sampleEntries);
    });
  });
});
