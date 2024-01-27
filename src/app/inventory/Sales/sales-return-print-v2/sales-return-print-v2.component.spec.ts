import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnPrintV2Component } from './sales-return-print-v2.component';

describe('SalesReturnPrintV2Component', () => {
  let component: SalesReturnPrintV2Component;
  let fixture: ComponentFixture<SalesReturnPrintV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnPrintV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnPrintV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
