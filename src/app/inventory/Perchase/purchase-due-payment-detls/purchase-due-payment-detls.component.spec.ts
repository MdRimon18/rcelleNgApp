import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDuePaymentDetlsComponent } from './purchase-due-payment-detls.component';

describe('PurchaseDuePaymentDetlsComponent', () => {
  let component: PurchaseDuePaymentDetlsComponent;
  let fixture: ComponentFixture<PurchaseDuePaymentDetlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseDuePaymentDetlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDuePaymentDetlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
