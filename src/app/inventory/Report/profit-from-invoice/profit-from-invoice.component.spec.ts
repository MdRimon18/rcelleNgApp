import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitFromInvoiceComponent } from './profit-from-invoice.component';

describe('ProfitFromInvoiceComponent', () => {
  let component: ProfitFromInvoiceComponent;
  let fixture: ComponentFixture<ProfitFromInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitFromInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitFromInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
