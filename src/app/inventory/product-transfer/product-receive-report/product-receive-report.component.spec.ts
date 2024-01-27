import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReceiveReportComponent } from './product-receive-report.component';

describe('ProductReceiveReportComponent', () => {
  let component: ProductReceiveReportComponent;
  let fixture: ComponentFixture<ProductReceiveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReceiveReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReceiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
