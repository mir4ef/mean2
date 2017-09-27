import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { CoreHttpService } from '../core/http/core-http.service';
import { AuthService } from '../core/auth/auth.service';
import { TokenService } from '../core/auth/token.service';
import { LoadingIndicatorService } from '../common/loading-indicator/loading-indicator.service';

import { DataService } from './data.service';

import { DataComponent } from './data.component';

describe('DataComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        DataComponent
      ],
      providers: [
        CoreHttpService,
        AuthService,
        TokenService,
        LoadingIndicatorService,
        DataService
      ]
    })
    .compileComponents();
  }));

  it('should exist', async(() => {
    const fixture: ComponentFixture<DataComponent> = TestBed.createComponent(DataComponent);
    const component: DataComponent = fixture.componentInstance;

    expect(component).toBeTruthy();

    fixture.destroy();
  }));

  it('should get the details of the user by calling getUser observable', async(
    inject([ LoadingIndicatorService, DataService ], (indicator: LoadingIndicatorService, dataService: DataService) => {
      const sampleUser = { id: 123, name: 'Name', username: 'first.last' };
      const fixture: ComponentFixture<DataComponent> = TestBed.createComponent(DataComponent);
      const component: DataComponent = fixture.componentInstance;

      spyOn(indicator, 'setIndicatorState');
      spyOn(dataService, 'getUser').and.returnValue(Observable.of({ message: sampleUser }));

      fixture.detectChanges();

      expect(indicator.setIndicatorState).toHaveBeenCalledWith(true);
      expect(dataService.getUser).toHaveBeenCalled();
      expect(dataService.getUser).toHaveBeenCalledTimes(1);

      fixture.whenStable().then(() => {
        expect(indicator.setIndicatorState).toHaveBeenCalledWith(false);
        expect(component.userData).toEqual(sampleUser);
        expect(component.errMsg).toBeUndefined();

        fixture.destroy();
      });
    })
  ));

  it('should get an error msg if there is a problem', async(
    inject([ LoadingIndicatorService, DataService ], (indicator: LoadingIndicatorService, dataService: DataService) => {
      const errResponse = { message: 'some error' };
      const fixture: ComponentFixture<DataComponent> = TestBed.createComponent(DataComponent);
      const component: DataComponent = fixture.componentInstance;

      spyOn(indicator, 'setIndicatorState');
      spyOn(dataService, 'getUser').and.returnValue(Observable.throw(errResponse));

      fixture.detectChanges();

      expect(indicator.setIndicatorState).toHaveBeenCalledWith(true);
      expect(dataService.getUser).toHaveBeenCalled();
      expect(dataService.getUser).toHaveBeenCalledTimes(1);

      fixture.whenStable().then(() => {
        expect(indicator.setIndicatorState).toHaveBeenCalledWith(false);
        expect(component.userData).toBeUndefined();
        expect(component.errMsg).toEqual(errResponse.message);

        fixture.destroy();
      });
    })
  ));

  it('should logout the user and navigate to a login page when logout clicked', async(
    inject([ Router, DataService ], (router: Router, dataService: DataService) => {
      const fixture: ComponentFixture<DataComponent> = TestBed.createComponent(DataComponent);
      const component: DataComponent = fixture.componentInstance;

      spyOn(dataService, 'logout');
      spyOn(router, 'navigate');

      component.logout();

      expect(dataService.logout).toHaveBeenCalled();
      expect(dataService.logout).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([ '/login' ]);

      fixture.destroy();
    }),
  ));
});
