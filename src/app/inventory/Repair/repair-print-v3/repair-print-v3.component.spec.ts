import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairPrintV3Component } from './repair-print-v3.component';

describe('RepairPrintV3Component', () => {
  let component: RepairPrintV3Component;
  let fixture: ComponentFixture<RepairPrintV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairPrintV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairPrintV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
