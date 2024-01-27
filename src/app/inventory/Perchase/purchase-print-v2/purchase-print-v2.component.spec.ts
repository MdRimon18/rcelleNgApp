import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePrintV2Component } from './purchase-print-v2.component';

describe('PurchasePrintV2Component', () => {
  let component: PurchasePrintV2Component;
  let fixture: ComponentFixture<PurchasePrintV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePrintV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePrintV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
