import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveProductComponent } from './recieve-product.component';

describe('RecieveProductComponent', () => {
  let component: RecieveProductComponent;
  let fixture: ComponentFixture<RecieveProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieveProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
