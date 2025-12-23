import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpNotasComponent } from './pop-up-notas.component';

describe('PopUpNotasComponent', () => {
  let component: PopUpNotasComponent;
  let fixture: ComponentFixture<PopUpNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
