import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsWithPurchaseReturnComponent } from './savings-with-purchase-return.component';

describe('SavingsWithPurchaseReturnComponent', () => {
  let component: SavingsWithPurchaseReturnComponent;
  let fixture: ComponentFixture<SavingsWithPurchaseReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsWithPurchaseReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsWithPurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
