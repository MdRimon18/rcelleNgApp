import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSerialNumbersComponent } from './product-serial-numbers.component';

describe('ProductSerialNumbersComponent', () => {
  let component: ProductSerialNumbersComponent;
  let fixture: ComponentFixture<ProductSerialNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSerialNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSerialNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
