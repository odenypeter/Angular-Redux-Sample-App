import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Workflowlevel2Component } from './workflowlevel2.component';

describe('Workflowlevel2Component', () => {
  let component: Workflowlevel2Component;
  let fixture: ComponentFixture<Workflowlevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Workflowlevel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Workflowlevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
