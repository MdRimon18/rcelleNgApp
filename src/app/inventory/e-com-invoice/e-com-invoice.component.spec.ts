import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EComInvoiceComponent } from './e-com-invoice.component';

describe('EComInvoiceComponent', () => {
  let component: EComInvoiceComponent;
  let fixture: ComponentFixture<EComInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EComInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EComInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
