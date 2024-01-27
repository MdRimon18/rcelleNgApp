import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEmpDisplayComponent } from './shop-emp-display.component';

describe('ShopEmpDisplayComponent', () => {
  let component: ShopEmpDisplayComponent;
  let fixture: ComponentFixture<ShopEmpDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEmpDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEmpDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
