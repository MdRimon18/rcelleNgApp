import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSerialNumberModalComponent } from './product-serial-number-modal.component';

describe('ProductSerialNumberModalComponent', () => {
  let component: ProductSerialNumberModalComponent;
  let fixture: ComponentFixture<ProductSerialNumberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSerialNumberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSerialNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
