import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnPrintV2Component } from './purchase-return-print-v2.component';

describe('PurchaseReturnPrintV2Component', () => {
  let component: PurchaseReturnPrintV2Component;
  let fixture: ComponentFixture<PurchaseReturnPrintV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReturnPrintV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnPrintV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
