import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePrintV3Component } from './purchase-print-v3.component';

describe('PurchasePrintV3Component', () => {
  let component: PurchasePrintV3Component;
  let fixture: ComponentFixture<PurchasePrintV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePrintV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePrintV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
