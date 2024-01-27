import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourOthersShopComponent } from './your-others-shop.component';

describe('YourOthersShopComponent', () => {
  let component: YourOthersShopComponent;
  let fixture: ComponentFixture<YourOthersShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourOthersShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourOthersShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
