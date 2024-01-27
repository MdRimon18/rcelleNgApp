import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderReportV1Component } from './customer-order-report-v1.component';

describe('CustomerOrderReportV1Component', () => {
  let component: CustomerOrderReportV1Component;
  let fixture: ComponentFixture<CustomerOrderReportV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderReportV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderReportV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
