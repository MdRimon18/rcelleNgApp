import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyCustomerComponent } from './edit-my-customer.component';

describe('EditMyCustomerComponent', () => {
  let component: EditMyCustomerComponent;
  let fixture: ComponentFixture<EditMyCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
