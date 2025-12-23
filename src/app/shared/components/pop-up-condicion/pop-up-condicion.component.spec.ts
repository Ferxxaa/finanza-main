import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCondicionComponent } from './pop-up-condicion.component';

describe('PopUpCondicionComponent', () => {
  let component: PopUpCondicionComponent;
  let fixture: ComponentFixture<PopUpCondicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpCondicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpCondicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
