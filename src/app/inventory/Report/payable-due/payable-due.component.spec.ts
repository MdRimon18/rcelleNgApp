import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableDueComponent } from './payable-due.component';

describe('PayableDueComponent', () => {
  let component: PayableDueComponent;
  let fixture: ComponentFixture<PayableDueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayableDueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayableDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
