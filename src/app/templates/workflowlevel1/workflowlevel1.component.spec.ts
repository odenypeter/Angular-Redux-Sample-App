import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Workflowlevel1Component } from './workflowlevel1.component';

describe('Workflowlevel1Component', () => {
  let component: Workflowlevel1Component;
  let fixture: ComponentFixture<Workflowlevel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Workflowlevel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Workflowlevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
