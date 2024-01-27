import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseStockComponent } from './add-purchase-stock.component';

describe('AddPurchaseStockComponent', () => {
  let component: AddPurchaseStockComponent;
  let fixture: ComponentFixture<AddPurchaseStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
