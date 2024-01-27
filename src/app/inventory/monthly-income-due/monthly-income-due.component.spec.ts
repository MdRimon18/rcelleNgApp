import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyIncomeDueComponent } from './monthly-income-due.component';

describe('MonthlyIncomeDueComponent', () => {
  let component: MonthlyIncomeDueComponent;
  let fixture: ComponentFixture<MonthlyIncomeDueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyIncomeDueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyIncomeDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
