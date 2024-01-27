import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeuPaymentDetailsComponent } from './deu-payment-details.component';

describe('DeuPaymentDetailsComponent', () => {
  let component: DeuPaymentDetailsComponent;
  let fixture: ComponentFixture<DeuPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeuPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeuPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
