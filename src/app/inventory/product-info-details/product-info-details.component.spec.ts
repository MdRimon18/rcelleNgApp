import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoDetailsComponent } from './product-info-details.component';

describe('ProductInfoDetailsComponent', () => {
  let component: ProductInfoDetailsComponent;
  let fixture: ComponentFixture<ProductInfoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
