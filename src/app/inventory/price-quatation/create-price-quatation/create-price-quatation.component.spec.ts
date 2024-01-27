import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePriceQuatationComponent } from './create-price-quatation.component';

describe('CreatePriceQuatationComponent', () => {
  let component: CreatePriceQuatationComponent;
  let fixture: ComponentFixture<CreatePriceQuatationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePriceQuatationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePriceQuatationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
