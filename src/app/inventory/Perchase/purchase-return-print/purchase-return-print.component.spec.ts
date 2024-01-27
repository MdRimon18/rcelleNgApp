import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnPrintComponent } from './purchase-return-print.component';

describe('PurchaseReturnPrintComponent', () => {
  let component: PurchaseReturnPrintComponent;
  let fixture: ComponentFixture<PurchaseReturnPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReturnPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
