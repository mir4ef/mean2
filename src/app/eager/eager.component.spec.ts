import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EagerComponent } from './eager.component';

describe('EagerComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EagerComponent ]
    })
    .compileComponents();
  }));

  it('should exist', async(() => {
    const fixture: ComponentFixture<EagerComponent> = TestBed.createComponent(EagerComponent);
    const component: EagerComponent = fixture.componentInstance;

    expect(component).toBeTruthy();

    fixture.destroy();
  }));
});
