import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMySupplierProfileComponent } from './edit-my-supplier-profile.component';

describe('EditMySupplierProfileComponent', () => {
  let component: EditMySupplierProfileComponent;
  let fixture: ComponentFixture<EditMySupplierProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMySupplierProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMySupplierProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
