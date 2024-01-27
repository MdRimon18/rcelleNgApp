import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderDisplayComponent } from './customer-order-display.component';

describe('CustomerOrderDisplayComponent', () => {
  let component: CustomerOrderDisplayComponent;
  let fixture: ComponentFixture<CustomerOrderDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
