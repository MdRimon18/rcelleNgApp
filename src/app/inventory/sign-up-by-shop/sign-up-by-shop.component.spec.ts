import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpByShopComponent } from './sign-up-by-shop.component';

describe('SignUpByShopComponent', () => {
  let component: SignUpByShopComponent;
  let fixture: ComponentFixture<SignUpByShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpByShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpByShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
