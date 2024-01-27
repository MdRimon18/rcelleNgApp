import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveInvoiceFromCmpnyComponent } from './recieve-invoice-from-cmpny.component';

describe('RecieveInvoiceFromCmpnyComponent', () => {
  let component: RecieveInvoiceFromCmpnyComponent;
  let fixture: ComponentFixture<RecieveInvoiceFromCmpnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieveInvoiceFromCmpnyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieveInvoiceFromCmpnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
