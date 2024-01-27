import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EComSettingComponent } from './e-com-setting.component';

describe('EComSettingComponent', () => {
  let component: EComSettingComponent;
  let fixture: ComponentFixture<EComSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EComSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EComSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
