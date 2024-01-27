import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRecitByInvoiceComponent } from './money-recit-by-invoice.component';

describe('MoneyRecitByInvoiceComponent', () => {
  let component: MoneyRecitByInvoiceComponent;
  let fixture: ComponentFixture<MoneyRecitByInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyRecitByInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRecitByInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
