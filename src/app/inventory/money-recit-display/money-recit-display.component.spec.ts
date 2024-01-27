import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRecitDisplayComponent } from './money-recit-display.component';

describe('MoneyRecitDisplayComponent', () => {
  let component: MoneyRecitDisplayComponent;
  let fixture: ComponentFixture<MoneyRecitDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyRecitDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRecitDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
