import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyHrProfileComponent } from './edit-my-hr-profile.component';

describe('EditMyHrProfileComponent', () => {
  let component: EditMyHrProfileComponent;
  let fixture: ComponentFixture<EditMyHrProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyHrProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyHrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
