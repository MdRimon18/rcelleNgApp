import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProductamountComponent } from './total-productamount.component';

describe('TotalProductamountComponent', () => {
  let component: TotalProductamountComponent;
  let fixture: ComponentFixture<TotalProductamountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalProductamountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalProductamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
