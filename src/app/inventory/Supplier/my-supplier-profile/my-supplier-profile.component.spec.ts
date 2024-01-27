import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySupplierProfileComponent } from './my-supplier-profile.component';

describe('MySupplierProfileComponent', () => {
  let component: MySupplierProfileComponent;
  let fixture: ComponentFixture<MySupplierProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySupplierProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySupplierProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
