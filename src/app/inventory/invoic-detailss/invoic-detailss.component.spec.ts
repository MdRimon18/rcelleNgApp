import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicDetailssComponent } from './invoic-detailss.component';

describe('InvoicDetailssComponent', () => {
  let component: InvoicDetailssComponent;
  let fixture: ComponentFixture<InvoicDetailssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicDetailssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicDetailssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
