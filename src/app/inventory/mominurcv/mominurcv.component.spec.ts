import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MominurcvComponent } from './mominurcv.component';

describe('MominurcvComponent', () => {
  let component: MominurcvComponent;
  let fixture: ComponentFixture<MominurcvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MominurcvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MominurcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
