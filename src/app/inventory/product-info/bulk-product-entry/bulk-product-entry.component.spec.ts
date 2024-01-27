import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkProductEntryComponent } from './bulk-product-entry.component';

describe('BulkProductEntryComponent', () => {
  let component: BulkProductEntryComponent;
  let fixture: ComponentFixture<BulkProductEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkProductEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkProductEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
