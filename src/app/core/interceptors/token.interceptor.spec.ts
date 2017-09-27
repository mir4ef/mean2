import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenService } from '../auth/token.service';
import { TokenInterceptor } from './token.interceptor';

import { CoreHttpService, IResponse } from '../http/core-http.service';

describe('TokenInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        CoreHttpService,
        TokenService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ],
    });
  });

  beforeEach(inject([ TokenService ], (tokenService: TokenService) => {
    // reset the token before each unit test
    tokenService.token = '';
  }));

  afterEach(inject([ HttpTestingController ], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  afterAll(inject([ TokenService ], (tokenService: TokenService) => {
    // reset the token before each unit test
    tokenService.token = '';
  }));

  it('should intercept an outgoing request and attach a token when available',
    inject([ CoreHttpService, TokenService, HttpTestingController ], (service: CoreHttpService, tokenService: TokenService, httpMock: HttpTestingController) => {
      tokenService.token = 'token string';
      const res: IResponse = { success: true, message: 'got data' };
      let actualRes: IResponse;

      service.apiGet({ path: 'endpoint' }).subscribe((data: IResponse): IResponse => actualRes = data);

      const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

      req.flush(res);

      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.has('x-access-token')).toBeTruthy();
      expect(actualRes).toEqual(res);
    }));

  it('should intercept an outgoing request, but not attach a token when not available',
    inject([ CoreHttpService, TokenService, HttpTestingController ], (service: CoreHttpService, tokenService: TokenService, httpMock: HttpTestingController) => {
      tokenService.token = '';

      const res: IResponse = { success: true, message: 'got data' };
      let actualRes: IResponse;

      service.apiGet({ path: 'endpoint' }).subscribe((data: IResponse): IResponse => actualRes = data);

      const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

      req.flush(res);

      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.has('x-access-token')).toBeFalsy();
      expect(actualRes).toEqual(res);
      expect(tokenService.token).toBeNull();
    }));
});
