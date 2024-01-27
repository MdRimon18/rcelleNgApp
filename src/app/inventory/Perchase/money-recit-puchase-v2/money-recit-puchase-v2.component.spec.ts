import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRecitPuchaseV2Component } from './money-recit-puchase-v2.component';

describe('MoneyRecitPuchaseV2Component', () => {
  let component: MoneyRecitPuchaseV2Component;
  let fixture: ComponentFixture<MoneyRecitPuchaseV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyRecitPuchaseV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRecitPuchaseV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
