import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpItemsComponent } from './pop-up-items.component';

describe('PopUpItemsComponent', () => {
  let component: PopUpItemsComponent;
  let fixture: ComponentFixture<PopUpItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
