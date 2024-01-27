import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpanseComponent } from './monthly-expanse.component';

describe('MonthlyExpanseComponent', () => {
  let component: MonthlyExpanseComponent;
  let fixture: ComponentFixture<MonthlyExpanseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyExpanseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyExpanseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
