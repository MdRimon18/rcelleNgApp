import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairRequestDisplayComponent } from './repair-request-display.component';

describe('RepairRequestDisplayComponent', () => {
  let component: RepairRequestDisplayComponent;
  let fixture: ComponentFixture<RepairRequestDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairRequestDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairRequestDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
