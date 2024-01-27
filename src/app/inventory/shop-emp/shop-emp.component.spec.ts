import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEmpComponent } from './shop-emp.component';

describe('ShopEmpComponent', () => {
  let component: ShopEmpComponent;
  let fixture: ComponentFixture<ShopEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
