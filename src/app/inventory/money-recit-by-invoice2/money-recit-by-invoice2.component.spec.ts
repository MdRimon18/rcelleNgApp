import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRecitByInvoice2Component } from './money-recit-by-invoice2.component';

describe('MoneyRecitByInvoice2Component', () => {
  let component: MoneyRecitByInvoice2Component;
  let fixture: ComponentFixture<MoneyRecitByInvoice2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyRecitByInvoice2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRecitByInvoice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
