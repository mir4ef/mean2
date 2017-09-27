import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorService } from './loading-indicator.service';

import { LoadingIndicatorComponent } from './loading-indicator.component';

describe('LoadingIndicatorComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingIndicatorComponent ],
      providers: [ LoadingIndicatorService ]
    })
    .compileComponents();
  }));

  it('should exist', async(() => {
    const fixture: ComponentFixture<LoadingIndicatorComponent> = TestBed.createComponent(LoadingIndicatorComponent);
    const component: LoadingIndicatorComponent = fixture.componentInstance;

    expect(component).toBeTruthy();

    fixture.destroy();
  }));
});
