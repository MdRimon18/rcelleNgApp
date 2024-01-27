import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierLedgerV2Component } from './supplier-ledger-v2.component';

describe('SupplierLedgerV2Component', () => {
  let component: SupplierLedgerV2Component;
  let fixture: ComponentFixture<SupplierLedgerV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierLedgerV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierLedgerV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
