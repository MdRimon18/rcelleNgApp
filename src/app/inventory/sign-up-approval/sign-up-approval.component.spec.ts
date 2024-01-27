import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpApprovalComponent } from './sign-up-approval.component';

describe('SignUpApprovalComponent', () => {
  let component: SignUpApprovalComponent;
  let fixture: ComponentFixture<SignUpApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
