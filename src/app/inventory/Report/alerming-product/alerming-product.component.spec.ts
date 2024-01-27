import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlermingProductComponent } from './alerming-product.component';

describe('AlermingProductComponent', () => {
  let component: AlermingProductComponent;
  let fixture: ComponentFixture<AlermingProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlermingProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlermingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
