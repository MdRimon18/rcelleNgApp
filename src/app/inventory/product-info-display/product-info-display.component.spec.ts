import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoDisplayComponent } from './product-info-display.component';

describe('ProductInfoDisplayComponent', () => {
  let component: ProductInfoDisplayComponent;
  let fixture: ComponentFixture<ProductInfoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
