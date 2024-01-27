import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntryEditPageComponent } from './product-entry-edit-page.component';

describe('ProductEntryEditPageComponent', () => {
  let component: ProductEntryEditPageComponent;
  let fixture: ComponentFixture<ProductEntryEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEntryEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEntryEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
