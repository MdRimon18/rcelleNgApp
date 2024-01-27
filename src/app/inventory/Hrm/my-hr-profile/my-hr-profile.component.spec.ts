import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHrProfileComponent } from './my-hr-profile.component';

describe('MyHrProfileComponent', () => {
  let component: MyHrProfileComponent;
  let fixture: ComponentFixture<MyHrProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHrProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
