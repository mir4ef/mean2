import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenService } from './token.service';
import { CoreHttpService, IResponse } from '../http/core-http.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
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
      ]
    });
  });

  beforeEach(inject([ AuthService, TokenService ], (authService: AuthService, tokenService: TokenService ) => {
    // reset the requestURL before each unit test in this file
    authService.requestedURL = '';

    // reset the token before each unit test in this file
    tokenService.token = '';
  }));

  afterEach(inject([ AuthService, TokenService, HttpTestingController ], (authService: AuthService, tokenService: TokenService, httpMock: HttpTestingController) => {
    // reset the requestURL after done with all unit tests in this file
    authService.requestedURL = '';

    // reset the token after done with all unit tests in this file
    tokenService.token = '';

    httpMock.verify();
  }));

  it('should exist',
    inject([ AuthService ], (service: AuthService) => {
      expect(service).toBeTruthy();
  }));

  it('should not have requestURL set at initialization',
    inject([ AuthService ], (service: AuthService) => {
      expect(service.requestedURL).toEqual('');
  }));

  it('should set the requestURL to the passed value',
    inject([ AuthService ], (service: AuthService) => {
      service.requestedURL = '/route';

      expect(service.requestedURL).toEqual('/route');
  }));

  it('should login user',
    inject([ AuthService, TokenService, HttpTestingController ], (service: AuthService, tokenService: TokenService, httpMock: HttpTestingController) => {
      const user = {
        username: 'user.name',
        password: 'password'
      };
      const res: IResponse = { success: true, message: 'logged in', token: 'jwt.token.string' };
      let actualRes: IResponse;

      spyOn(service, 'updateLoggedInState').and.callThrough();

      service.login(user).subscribe((data: IResponse): IResponse => actualRes = data);

      const req: TestRequest = httpMock.expectOne('/api/v1/auth');

      req.flush(res);

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(user);
      expect(actualRes).toEqual(res);
      expect(service.updateLoggedInState).toHaveBeenCalledTimes(1);
      expect(service.updateLoggedInState).toHaveBeenCalledWith();
      expect(tokenService.token).toBe(actualRes.token);
  }));

  it('should get the logged in state of the user',
    inject([ AuthService, TokenService ], (service: AuthService, tokenService: TokenService) => {
      tokenService.token = 'token';
      service.updateLoggedInState();

      service.getLoggedInState().subscribe((state: boolean) => expect(state).toBeTruthy());
  }));

  it('should return false if user is not logged in',
    inject([ AuthService, TokenService ], (service: AuthService, tokenService: TokenService) => {
      tokenService.token = '';

      expect(service.isLoggedIn).toBeFalsy();
  }));

  it('should return true if user is logged in',
    inject([ AuthService, TokenService ], (service: AuthService, tokenService: TokenService) => {
      tokenService.token = 'token';

      expect(service.isLoggedIn).toBeTruthy();
  }));

  it('should get user details',
    inject([ AuthService, HttpTestingController ], (service: AuthService, httpMock: HttpTestingController) => {
      const res: IResponse = { success: true, message: 'decoded token info' };
      let actualRes: IResponse;

      service.getUser().subscribe((data: IResponse): IResponse => actualRes = data);

      const req: TestRequest = httpMock.expectOne('/api/v1/me');

      req.flush(res);

      expect(req.request.method).toEqual('GET');
      expect(actualRes).toEqual(res);
  }));

  it('should logout the user',
    inject([ AuthService ], (service: AuthService) => {
      spyOn(service, 'updateLoggedInState').and.callThrough();

      service.logout();

      expect(service.updateLoggedInState).toHaveBeenCalled();
      expect(service.updateLoggedInState).toHaveBeenCalledTimes(1);
      expect(service.updateLoggedInState).toHaveBeenCalledWith();
      expect(service.isLoggedIn).toBeFalsy();
  }));
});
