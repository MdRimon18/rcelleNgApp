import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceQuatationComponent } from './price-quatation.component';

describe('PriceQuatationComponent', () => {
  let component: PriceQuatationComponent;
  let fixture: ComponentFixture<PriceQuatationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceQuatationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceQuatationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
