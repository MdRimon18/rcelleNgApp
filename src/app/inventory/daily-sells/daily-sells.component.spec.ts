import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySellsComponent } from './daily-sells.component';

describe('DailySellsComponent', () => {
  let component: DailySellsComponent;
  let fixture: ComponentFixture<DailySellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
