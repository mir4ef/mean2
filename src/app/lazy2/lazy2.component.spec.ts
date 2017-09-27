import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Lazy2Component } from './lazy2.component';

describe('Lazy2Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ Lazy2Component ]
    })
    .compileComponents();
  }));

  it('should exist', async(() => {
    const fixture: ComponentFixture<Lazy2Component> = TestBed.createComponent(Lazy2Component);
    const component: Lazy2Component = fixture.componentInstance;

    expect(component).toBeTruthy();

    fixture.destroy();
  }));
});
