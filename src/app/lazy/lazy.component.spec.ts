import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { CoreHttpService } from '../core/http/core-http.service';
import { LoadingIndicatorService } from '../common/loading-indicator/loading-indicator.service';
import { TokenService } from '../core/auth/token.service';

import { LazyComponent } from './lazy.component';
import { LazyService } from './lazy.service';

describe('LazyComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ LazyComponent ],
      providers: [
        CoreHttpService,
        LazyService,
        LoadingIndicatorService,
        TokenService
      ]
    })
    .compileComponents();
  }));

  it('should exist', async(() => {
    const fixture: ComponentFixture<LazyComponent> = TestBed.createComponent(LazyComponent);
    const component: LazyComponent = fixture.componentInstance;

    expect(component).toBeTruthy();
  }));

  it('should get data by calling getData observable', async(
    inject([ LazyService ], (lazyService: LazyService) => {
      const sampleData = {
        id: 123,
        title: 'Title',
        bodyText: 'Body text.'
      };
      const fixture: ComponentFixture<LazyComponent> = TestBed.createComponent(LazyComponent);
      const component: LazyComponent = fixture.componentInstance;

      component.err = '';

      spyOn(lazyService, 'getData').and.returnValue(Observable.of({ message: sampleData }));

      fixture.detectChanges();

      expect(lazyService.getData).toHaveBeenCalled();

      fixture.whenStable().then(() => {
        expect(component.data).toEqual(sampleData);
        expect(component.err).toEqual('');
      });
    })
  ));

  it('should get a server error', async(
    inject([ LazyService ], (lazyService: LazyService) => {
      const response = 'an error occurred.';
      const fixture: ComponentFixture<LazyComponent> = TestBed.createComponent(LazyComponent);
      const component: LazyComponent = fixture.componentInstance;

      component.err = '';

      spyOn(lazyService, 'getData').and.returnValue(Observable.throw(response));

      fixture.detectChanges();

      expect(lazyService.getData).toHaveBeenCalled();

      fixture.whenStable().then(() => {
        expect(component.data).toBeUndefined();
        expect(component.err).toEqual(response);
      });
    })
  ));
});
