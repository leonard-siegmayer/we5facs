import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadReportingComponent } from './head-reporting.component';

describe('HeadReportingComponent', () => {
  let component: HeadReportingComponent;
  let fixture: ComponentFixture<HeadReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
