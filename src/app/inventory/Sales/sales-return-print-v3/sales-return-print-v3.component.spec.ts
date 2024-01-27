import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnPrintV3Component } from './sales-return-print-v3.component';

describe('SalesReturnPrintV3Component', () => {
  let component: SalesReturnPrintV3Component;
  let fixture: ComponentFixture<SalesReturnPrintV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnPrintV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnPrintV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
