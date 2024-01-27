import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchECompnyComponent } from './search-e-compny.component';

describe('SearchECompnyComponent', () => {
  let component: SearchECompnyComponent;
  let fixture: ComponentFixture<SearchECompnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchECompnyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchECompnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
