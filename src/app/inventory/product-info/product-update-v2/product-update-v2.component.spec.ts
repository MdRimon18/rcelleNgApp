import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUpdateV2Component } from './product-update-v2.component';

describe('ProductUpdateV2Component', () => {
  let component: ProductUpdateV2Component;
  let fixture: ComponentFixture<ProductUpdateV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUpdateV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUpdateV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
