import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePurchaseStockComponent } from './remove-purchase-stock.component';

describe('RemovePurchaseStockComponent', () => {
  let component: RemovePurchaseStockComponent;
  let fixture: ComponentFixture<RemovePurchaseStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePurchaseStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePurchaseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
