import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHrProfileDisplayComponent } from './my-hr-profile-display.component';

describe('MyHrProfileDisplayComponent', () => {
  let component: MyHrProfileDisplayComponent;
  let fixture: ComponentFixture<MyHrProfileDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHrProfileDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHrProfileDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
