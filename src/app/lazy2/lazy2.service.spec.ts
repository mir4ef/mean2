import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { IResponse } from '../core/http/core-http.service';

import { Lazy2Service } from './lazy2.service';

describe('Lazy2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ Lazy2Service ]
    });
  });

  afterEach(inject([ HttpTestingController ], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should exist', inject([Lazy2Service], (service: Lazy2Service) => {
    expect(service).toBeTruthy();
  }));

  it('should return a list of entries',
    inject([Lazy2Service, HttpTestingController], (service: Lazy2Service, httpMock: HttpTestingController) => {
      const res: IResponse = {
        success : true,
        message: [
          { id: 123, name: 'Entry 1' },
          { id: 456, name: 'Entry 2' }
        ]
      };

      service.getEntries().then((data: IResponse): void => {
        expect(data).toEqual(res);
      });

      const req: TestRequest = httpMock.expectOne('/api/v1/sampleEntries');

      req.flush(res);

      expect(req.request.method).toEqual('GET');
  }));
});
