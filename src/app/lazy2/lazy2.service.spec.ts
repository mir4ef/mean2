import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreHttpService, IResponse } from '../core/http/core-http.service';
import { TokenService } from '../core/auth/token.service';

import { Lazy2Service } from './lazy2.service';

describe('Lazy2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CoreHttpService,
        TokenService,
        Lazy2Service
      ]
    });
  });

  afterEach(inject([ HttpTestingController ], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should exist', inject([ Lazy2Service ], (service: Lazy2Service) => {
    expect(service).toBeTruthy();
  }));

  it('should return a list of entries',
    inject([ Lazy2Service, HttpTestingController ], (service: Lazy2Service, httpMock: HttpTestingController) => {
      const res: IResponse = {
        success : true,
        message: [
          { id: 123, name: 'Entry 1' },
          { id: 456, name: 'Entry 2' }
        ]
      };
      let actualRes: IResponse;

      service.getData().subscribe((data: IResponse): void => {
        actualRes = data;
      });

      const req: TestRequest = httpMock.expectOne('/api/v1/sampleEntries');

      req.flush(res);

      expect(req.request.method).toEqual('GET');
      expect(actualRes).toEqual(res);
  }));
});
