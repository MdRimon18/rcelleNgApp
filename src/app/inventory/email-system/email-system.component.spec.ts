import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSystemComponent } from './email-system.component';

describe('EmailSystemComponent', () => {
  let component: EmailSystemComponent;
  let fixture: ComponentFixture<EmailSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
