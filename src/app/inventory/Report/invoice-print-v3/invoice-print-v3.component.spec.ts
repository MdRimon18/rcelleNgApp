import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePrintV3Component } from './invoice-print-v3.component';

describe('InvoicePrintV3Component', () => {
  let component: InvoicePrintV3Component;
  let fixture: ComponentFixture<InvoicePrintV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicePrintV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePrintV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
