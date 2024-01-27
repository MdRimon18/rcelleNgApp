import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEmpCmpltePrfleComponent } from './shop-emp-cmplte-prfle.component';

describe('ShopEmpCmpltePrfleComponent', () => {
  let component: ShopEmpCmpltePrfleComponent;
  let fixture: ComponentFixture<ShopEmpCmpltePrfleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEmpCmpltePrfleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEmpCmpltePrfleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
