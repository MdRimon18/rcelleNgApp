import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialDetailsFromInvoiceComponent } from './serial-details-from-invoice.component';

describe('SerialDetailsFromInvoiceComponent', () => {
  let component: SerialDetailsFromInvoiceComponent;
  let fixture: ComponentFixture<SerialDetailsFromInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialDetailsFromInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialDetailsFromInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
