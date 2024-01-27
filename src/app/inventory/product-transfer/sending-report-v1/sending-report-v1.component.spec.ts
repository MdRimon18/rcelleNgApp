import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingReportV1Component } from './sending-report-v1.component';

describe('SendingReportV1Component', () => {
  let component: SendingReportV1Component;
  let fixture: ComponentFixture<SendingReportV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingReportV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingReportV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
