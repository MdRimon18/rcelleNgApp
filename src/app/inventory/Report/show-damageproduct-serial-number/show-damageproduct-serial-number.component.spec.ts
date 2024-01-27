import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDamageproductSerialNumberComponent } from './show-damageproduct-serial-number.component';

describe('ShowDamageproductSerialNumberComponent', () => {
  let component: ShowDamageproductSerialNumberComponent;
  let fixture: ComponentFixture<ShowDamageproductSerialNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDamageproductSerialNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDamageproductSerialNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
