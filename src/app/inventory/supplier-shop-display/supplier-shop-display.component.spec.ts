import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierShopDisplayComponent } from './supplier-shop-display.component';

describe('SupplierShopDisplayComponent', () => {
  let component: SupplierShopDisplayComponent;
  let fixture: ComponentFixture<SupplierShopDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierShopDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierShopDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
