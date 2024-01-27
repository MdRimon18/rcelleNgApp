import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnPrintV3Component } from './purchase-return-print-v3.component';

describe('PurchaseReturnPrintV3Component', () => {
  let component: PurchaseReturnPrintV3Component;
  let fixture: ComponentFixture<PurchaseReturnPrintV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReturnPrintV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnPrintV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
