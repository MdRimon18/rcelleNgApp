import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourOthersShopDisplayComponent } from './your-others-shop-display.component';

describe('YourOthersShopDisplayComponent', () => {
  let component: YourOthersShopDisplayComponent;
  let fixture: ComponentFixture<YourOthersShopDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourOthersShopDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourOthersShopDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
