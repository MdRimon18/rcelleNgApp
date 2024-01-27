import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingReportV2Component } from './sending-report-v2.component';

describe('SendingReportV2Component', () => {
  let component: SendingReportV2Component;
  let fixture: ComponentFixture<SendingReportV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingReportV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingReportV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
