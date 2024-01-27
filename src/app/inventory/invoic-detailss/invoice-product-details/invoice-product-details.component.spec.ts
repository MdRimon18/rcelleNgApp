import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceProductDetailsComponent } from './invoice-product-details.component';

describe('InvoiceProductDetailsComponent', () => {
  let component: InvoiceProductDetailsComponent;
  let fixture: ComponentFixture<InvoiceProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
