import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicPrintComponent } from './invoic-print.component';

describe('InvoicPrintComponent', () => {
  let component: InvoicPrintComponent;
  let fixture: ComponentFixture<InvoicPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
