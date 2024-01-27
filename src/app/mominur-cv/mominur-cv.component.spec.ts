import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MominurCvComponent } from './mominur-cv.component';

describe('MominurCvComponent', () => {
  let component: MominurCvComponent;
  let fixture: ComponentFixture<MominurCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MominurCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MominurCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
