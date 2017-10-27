import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { CoreHttpService } from '../../core/http/core-http.service';
import { TokenService } from '../../core/auth/token.service';
import { LoadingIndicatorService } from '../../common/loading-indicator/loading-indicator.service';
import { IEntry, Lazy2Service } from '../lazy2.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ListComponent ],
      providers: [
        CoreHttpService,
        TokenService,
        LoadingIndicatorService,
        Lazy2Service
      ]
    })
    .compileComponents();
  }));

  it('should exist', async(() => {
    const fixture: ComponentFixture<ListComponent> = TestBed.createComponent(ListComponent);
    const component: ListComponent = fixture.componentInstance;

    expect(component).toBeTruthy();

    fixture.destroy();
  }));

  it('should get a list of entries by calling getEntries promise', async(
    inject([Lazy2Service], (lazy2Service: Lazy2Service) => {
      const sampleEntries: Array<IEntry> = [
        {
          id: 123,
          name: 'Entry 1'
        },
        {
          id: 456,
          name: 'Entry 2'
        }
      ];
      const len: number = sampleEntries.length;
      const fixture: ComponentFixture<ListComponent> = TestBed.createComponent(ListComponent);
      const component: ListComponent = fixture.componentInstance;

      component.errorMsg = '';

      spyOn(lazy2Service, 'getData').and.returnValue(Observable.of({ message: sampleEntries }));

      fixture.detectChanges();

      expect(lazy2Service.getData).toHaveBeenCalled();

      fixture.whenStable().then(() => {
        expect(component.entries).toEqual(sampleEntries);
        expect(component.entries.length).toBe(len);
        expect(component.errorMsg).toEqual('');

        fixture.destroy();
      });
    })
  ));

  it('should get a server error', async(
    inject([ Lazy2Service ], (lazy2Service: Lazy2Service) => {
      const response = 'an error occurred.';
      const fixture: ComponentFixture<ListComponent> = TestBed.createComponent(ListComponent);
      const component: ListComponent = fixture.componentInstance;

      component.errorMsg = '';

      spyOn(lazy2Service, 'getData').and.returnValue(Observable.throw({ message: response }));

      fixture.detectChanges();

      expect(lazy2Service.getData).toHaveBeenCalled();

      fixture.whenStable().then(() => {
        expect(component.entries).toBeUndefined();
        expect(component.errorMsg).toEqual(response);

        fixture.destroy();
      });
    })
  ));
});
