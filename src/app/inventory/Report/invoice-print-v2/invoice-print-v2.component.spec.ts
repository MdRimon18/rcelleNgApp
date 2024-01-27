import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePrintV2Component } from './invoice-print-v2.component';

describe('InvoicePrintV2Component', () => {
  let component: InvoicePrintV2Component;
  let fixture: ComponentFixture<InvoicePrintV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicePrintV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePrintV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
