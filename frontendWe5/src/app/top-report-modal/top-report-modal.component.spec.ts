import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopReportModalComponent } from './top-report-modal.component';

describe('TopReportModalComponent', () => {
  let component: TopReportModalComponent;
  let fixture: ComponentFixture<TopReportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopReportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
