import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLedgerV2Component } from './customer-ledger-v2.component';

describe('CustomerLedgerV2Component', () => {
  let component: CustomerLedgerV2Component;
  let fixture: ComponentFixture<CustomerLedgerV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLedgerV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLedgerV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
