import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRecitPurchaseComponent } from './money-recit-purchase.component';

describe('MoneyRecitPurchaseComponent', () => {
  let component: MoneyRecitPurchaseComponent;
  let fixture: ComponentFixture<MoneyRecitPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyRecitPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRecitPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
