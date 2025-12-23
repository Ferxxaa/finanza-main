import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLoginFixedComponent } from './pop-up-login-fixed.component';

describe('PopUpLoginFixedComponent', () => {
  let component: PopUpLoginFixedComponent;
  let fixture: ComponentFixture<PopUpLoginFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpLoginFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpLoginFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
