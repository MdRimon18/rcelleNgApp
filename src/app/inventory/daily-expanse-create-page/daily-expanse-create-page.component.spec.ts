import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExpanseCreatePageComponent } from './daily-expanse-create-page.component';

describe('DailyExpanseCreatePageComponent', () => {
  let component: DailyExpanseCreatePageComponent;
  let fixture: ComponentFixture<DailyExpanseCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyExpanseCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyExpanseCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
