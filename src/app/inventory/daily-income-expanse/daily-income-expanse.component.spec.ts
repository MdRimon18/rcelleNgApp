import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyIncomeExpanseComponent } from './daily-income-expanse.component';

describe('DailyIncomeExpanseComponent', () => {
  let component: DailyIncomeExpanseComponent;
  let fixture: ComponentFixture<DailyIncomeExpanseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyIncomeExpanseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyIncomeExpanseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
