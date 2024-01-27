import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDamageReportComponent } from './product-damage-report.component';

describe('ProductDamageReportComponent', () => {
  let component: ProductDamageReportComponent;
  let fixture: ComponentFixture<ProductDamageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDamageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDamageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
