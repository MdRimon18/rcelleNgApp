import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierShopComponent } from './supplier-shop.component';

describe('SupplierShopComponent', () => {
  let component: SupplierShopComponent;
  let fixture: ComponentFixture<SupplierShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
