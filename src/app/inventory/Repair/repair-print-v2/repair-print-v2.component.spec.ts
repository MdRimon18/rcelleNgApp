import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairPrintV2Component } from './repair-print-v2.component';

describe('RepairPrintV2Component', () => {
  let component: RepairPrintV2Component;
  let fixture: ComponentFixture<RepairPrintV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairPrintV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairPrintV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
