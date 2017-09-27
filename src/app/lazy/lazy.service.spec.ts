import { inject, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenService } from '../core/auth/token.service';
import { CoreHttpService, IResponse } from '../core/http/core-http.service';

import { LazyService } from './lazy.service';

describe('LazyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CoreHttpService,
        LazyService,
        TokenService,
      ]
    });
  });

  afterEach(inject([ HttpTestingController ], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should exist', inject([ LazyService ], (service: LazyService) => {
    expect(service).toBeTruthy();
  }));

  it('should return data details',
    inject([ LazyService, HttpTestingController ], (service: LazyService, httpMock: HttpTestingController) => {
      const res: IResponse = { success: true, message: { id: 123, title: 'Title', bodyText: 'Body text.' }};
      let actualRes: IResponse;

      service.getData().subscribe((data: IResponse): void => {
        actualRes = data;
      });

      const req: TestRequest = httpMock.expectOne('/api/v1/sampleData');

      req.flush(res);

      expect(req.request.method).toEqual('GET');
      expect(actualRes).toEqual(res);
  }));

  it('should return a server error if something went wrong on the server side',
    inject([ LazyService, HttpTestingController ], (service: LazyService, httpMock: HttpTestingController) => {
      const res: IResponse = {
        success: false,
        message: 'server error message'
      };
      let actualRes: IResponse;

      service.getData().subscribe(null, (error: HttpErrorResponse): void => {
        actualRes = error.error;

        expect(error.status).toBe(500);
        expect(actualRes.message).toEqual(res.message);
        expect(actualRes.success).toBeFalsy();
      });

      const req: TestRequest = httpMock.expectOne('/api/v1/sampleData');

      req.flush(res, { status: 500, statusText: 'OK' });

      expect(req.request.method).toEqual('GET');
  }));
});
