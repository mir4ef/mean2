import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared/shared.module';

import { Lazy2Module } from '../lazy2.module';
import { DetailComponent } from './detail.component';
import { IEntry, Lazy2Service } from '../lazy2.service';

describe('DetailComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        Lazy2Module,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  it('should create', async(() => {
    const fixture: ComponentFixture<DetailComponent> = TestBed.createComponent(DetailComponent);
    const component: DetailComponent = fixture.componentInstance;

    expect(component).toBeTruthy();

    fixture.destroy();
  }));

  it('should get the details of the selected element by calling getEntry promise', async(
    inject([Lazy2Service], (lazy2Service: Lazy2Service) => {
      const sampleEntry: IEntry = { id: 123, name: 'Name' };
      const fixture: ComponentFixture<DetailComponent> = TestBed.createComponent(DetailComponent);
      const component: DetailComponent = fixture.componentInstance;

      spyOn(lazy2Service, 'getEntry').and.returnValue(sampleEntry);

      fixture.detectChanges();

      expect(lazy2Service.getEntry).toHaveBeenCalled();

      fixture.whenStable().then(() => {
        expect(component.entry).toEqual(sampleEntry);

        fixture.destroy();
      });
    })
  ));
});
