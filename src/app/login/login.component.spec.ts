import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { SharedModule } from '../shared/shared.module';

import { CoreHttpService } from '../core/http/core-http.service';
import { AuthService } from '../core/auth/auth.service';
import { TokenService } from '../core/auth/token.service';
import { LoadingIndicatorService } from '../common/loading-indicator/loading-indicator.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        CoreHttpService,
        AuthService,
        TokenService,
        LoadingIndicatorService
      ]
    })
    .compileComponents();
  }));

  it('should exist', async(() => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    const component: LoginComponent = fixture.componentInstance;

    expect(component).toBeTruthy();

    fixture.destroy();
  }));

  it('should login user successfully and redirect to /', async(
    inject([ Router, AuthService ], (router: Router, authService: AuthService) => {
      const user = { username: 'tester', password: 'pass' };
      const response = { success: true, message: 'logged in', token: 'string' };
      const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
      const component: LoginComponent = fixture.componentInstance;

      component.user = user;
      component.errMsg = '';

      fixture.detectChanges();

      spyOn(router, 'navigate');
      spyOn(authService, 'login').and.returnValue(Observable.of(response));

      component.login();

      fixture.detectChanges();

      expect(authService.login).toHaveBeenCalled();
      expect(authService.login).toHaveBeenCalledWith(user);

      fixture.whenStable().then(() => {
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(component.errMsg).toEqual('');

        fixture.destroy();
      });
    })
  ));

  it('should login user successfully and redirect to /someRoute', async(
    inject([ Router, AuthService ], (router: Router, authService: AuthService) => {
      const url = '/someRoute';
      const user = { username: 'tester', password: 'pass' };
      const response = { success: true, message: 'logged in', token: 'string' };
      const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
      const component: LoginComponent = fixture.componentInstance;

      authService.requestedURL = url;
      component.user = user;
      component.errMsg = '';

      fixture.detectChanges();

      spyOn(router, 'navigate');
      spyOn(authService, 'login').and.returnValue(Observable.of(response));
      component.login();

      fixture.detectChanges();

      expect(authService.login).toHaveBeenCalled();
      expect(authService.login).toHaveBeenCalledWith(user);

      fixture.whenStable().then(() => {
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith([url]);
        expect(component.errMsg).toEqual('');

        fixture.destroy();
      });
    })
  ));

  it('should fail to login the user and display err message', async(
    inject([ Router, AuthService ], (router: Router, authService: AuthService) => {
      const user = { username: 'tester', password: 'wrong' };
      const response = { success: false, message: 'wrong credentials' };
      const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
      const component: LoginComponent = fixture.componentInstance;

      component.user = user;
      component.errMsg = '';

      fixture.detectChanges();

      spyOn(router, 'navigate');
      spyOn(authService, 'login').and.returnValue(Observable.throw(response));

      component.login();

      fixture.detectChanges();

      expect(authService.login).toHaveBeenCalled();
      expect(authService.login).toHaveBeenCalledWith(user);

      fixture.whenStable().then(() => {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(component.errMsg).toEqual('wrong credentials');

        fixture.destroy();
      });
    })
  ));
});
