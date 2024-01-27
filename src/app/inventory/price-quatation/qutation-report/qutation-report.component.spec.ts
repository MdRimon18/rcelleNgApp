import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QutationReportComponent } from './qutation-report.component';

describe('QutationReportComponent', () => {
  let component: QutationReportComponent;
  let fixture: ComponentFixture<QutationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QutationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QutationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
