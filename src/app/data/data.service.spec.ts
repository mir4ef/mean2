import { inject, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../core/auth/auth.service';
import { TokenService } from '../core/auth/token.service';
import { CoreHttpService, IResponse } from '../core/http/core-http.service';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CoreHttpService,
        AuthService,
        TokenService,
        DataService,
      ]
    });
  });

  afterEach(inject([ HttpTestingController ], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should exist', inject([ DataService ], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return user data details',
    inject([ DataService, HttpTestingController ], (service: DataService, httpMock: HttpTestingController) => {
      const id = 111;
      const res: IResponse = { success: true, message: { id, name: 'Name', username: 'first.last' }};
      let actualRes: IResponse;

      service.getUser(id).subscribe((data: IResponse) => {
        actualRes = data;
      });

      const req: TestRequest = httpMock.expectOne(`/api/v1/data/${id}`);

      req.flush(res);

      expect(req.request.method).toEqual('GET');
      expect(actualRes).toEqual(res);
  }));

  it('should return 404 if the user id doesnt exist',
    inject([ DataService, HttpTestingController ], (service: DataService, httpMock: HttpTestingController) => {
      const id = 111;
      const res: IResponse = {
        success: false,
        message: 'user not found'
      };
      let actualRes: IResponse;

      service.getUser(id).subscribe(null, (error: HttpErrorResponse) => {
        actualRes = error.error;

        expect(error.status).toBe(404);
        expect(actualRes).toEqual(res);
      });

      const req: TestRequest = httpMock.expectOne(`/api/v1/data/${id}`);

      req.flush(res, { status: 404, statusText: 'OK' });

      expect(req.request.method).toEqual('GET');
  }));

  it('should return a server error if something went wrong on the server side',
    inject([ DataService, HttpTestingController ], (service: DataService, httpMock: HttpTestingController) => {
      const id = 111;
      const res: IResponse = {
        success: false,
        message: 'server error'
      };
      let actualRes: IResponse;

      service.getUser(id).subscribe(null, (error: HttpErrorResponse) => {
        actualRes = error.error;

        expect(error.status).toBe(500);
        expect(actualRes).toEqual(res);
      });

      const req: TestRequest = httpMock.expectOne(`/api/v1/data/${id}`);

      req.flush(res, { status: 500, statusText: 'OK' });

      expect(req.request.method).toEqual('GET');
  }));
});
