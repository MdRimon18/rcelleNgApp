import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitWithSalseReturnComponent } from './profit-with-salse-return.component';

describe('ProfitWithSalseReturnComponent', () => {
  let component: ProfitWithSalseReturnComponent;
  let fixture: ComponentFixture<ProfitWithSalseReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitWithSalseReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitWithSalseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
