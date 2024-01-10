import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProblemsComponent } from './top-problems.component';

describe('TopProblemsComponent', () => {
  let component: TopProblemsComponent;
  let fixture: ComponentFixture<TopProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
