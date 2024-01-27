import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntryCreatePageComponent } from './product-entry-create-page.component';

describe('ProductEntryCreatePageComponent', () => {
  let component: ProductEntryCreatePageComponent;
  let fixture: ComponentFixture<ProductEntryCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEntryCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEntryCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
