import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReceivingInfoComponent } from './product-receiving-info.component';

describe('ProductReceivingInfoComponent', () => {
  let component: ProductReceivingInfoComponent;
  let fixture: ComponentFixture<ProductReceivingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReceivingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReceivingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
