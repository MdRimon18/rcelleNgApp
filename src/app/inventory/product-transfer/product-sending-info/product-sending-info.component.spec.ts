import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSendingInfoComponent } from './product-sending-info.component';

describe('ProductSendingInfoComponent', () => {
  let component: ProductSendingInfoComponent;
  let fixture: ComponentFixture<ProductSendingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSendingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSendingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
