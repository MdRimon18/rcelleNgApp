import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProfileDisplayComponent } from './supplier-profile-display.component';

describe('SupplierProfileDisplayComponent', () => {
  let component: SupplierProfileDisplayComponent;
  let fixture: ComponentFixture<SupplierProfileDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierProfileDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProfileDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
