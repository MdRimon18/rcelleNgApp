import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEmpEditComponent } from './shop-emp-edit.component';

describe('ShopEmpEditComponent', () => {
  let component: ShopEmpEditComponent;
  let fixture: ComponentFixture<ShopEmpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEmpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEmpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
