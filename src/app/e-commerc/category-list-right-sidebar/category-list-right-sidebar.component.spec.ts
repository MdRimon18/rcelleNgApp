import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListRightSidebarComponent } from './category-list-right-sidebar.component';

describe('CategoryListRightSidebarComponent', () => {
  let component: CategoryListRightSidebarComponent;
  let fixture: ComponentFixture<CategoryListRightSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListRightSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
