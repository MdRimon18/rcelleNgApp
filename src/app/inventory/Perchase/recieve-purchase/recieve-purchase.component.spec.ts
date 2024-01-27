import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievePurchaseComponent } from './recieve-purchase.component';

describe('RecievePurchaseComponent', () => {
  let component: RecievePurchaseComponent;
  let fixture: ComponentFixture<RecievePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
