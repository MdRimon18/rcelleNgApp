import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSubCategoriesComponent } from './add-product-sub-categories.component';

describe('AddProductSubCategoriesComponent', () => {
  let component: AddProductSubCategoriesComponent;
  let fixture: ComponentFixture<AddProductSubCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductSubCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
