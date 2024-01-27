import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuMngmntComponent } from './user-menu-mngmnt.component';

describe('UserMenuMngmntComponent', () => {
  let component: UserMenuMngmntComponent;
  let fixture: ComponentFixture<UserMenuMngmntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuMngmntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuMngmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
