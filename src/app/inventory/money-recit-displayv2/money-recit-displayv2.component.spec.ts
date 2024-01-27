import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRecitDisplayv2Component } from './money-recit-displayv2.component';

describe('MoneyRecitDisplayv2Component', () => {
  let component: MoneyRecitDisplayv2Component;
  let fixture: ComponentFixture<MoneyRecitDisplayv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyRecitDisplayv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRecitDisplayv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
