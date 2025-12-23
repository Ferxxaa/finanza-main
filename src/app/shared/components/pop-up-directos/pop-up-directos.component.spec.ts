import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDirectosComponent } from './pop-up-directos.component';

describe('PopUpDirectosComponent', () => {
  let component: PopUpDirectosComponent;
  let fixture: ComponentFixture<PopUpDirectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDirectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDirectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
