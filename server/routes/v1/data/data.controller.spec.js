/* eslint-env jasmine */

'use strict';

const dataGET = require('./data.controller').dataGET;

describe('/data Endpoint', () => {
  describe('GET', () => {
    it('should return data with a success flag', () => {
      const user = {
        id: 123,
        name: 'First Last'
      };
      const req = {
        query: {},
        params: {},
        body: {}
      };
      const res = {
        json: jasmine.createSpy().and.callFake(() => ({ success: true, message: user }))
      };
      const resp = dataGET(req, res);

      expect(resp).toEqual({ success: true, message: user });
      expect(resp.success).toBe(true);
      expect(resp.message).toEqual(user);
    });
  });
});
