import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiveableComponent } from './payment-receiveable.component';

describe('PaymentReceiveableComponent', () => {
  let component: PaymentReceiveableComponent;
  let fixture: ComponentFixture<PaymentReceiveableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReceiveableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiveableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
