import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderReportV2Component } from './customer-order-report-v2.component';

describe('CustomerOrderReportV2Component', () => {
  let component: CustomerOrderReportV2Component;
  let fixture: ComponentFixture<CustomerOrderReportV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderReportV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderReportV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
