import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyIncomeComponent } from './daily-income.component';

describe('DailyIncomeComponent', () => {
  let component: DailyIncomeComponent;
  let fixture: ComponentFixture<DailyIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
