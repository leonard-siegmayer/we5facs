import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemDispatchesComponent } from './problem-dispatches.component';

describe('ProblemDispatchesComponent', () => {
  let component: ProblemDispatchesComponent;
  let fixture: ComponentFixture<ProblemDispatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemDispatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemDispatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
