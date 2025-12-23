import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorPopUpComponent } from './contenedor-pop-up.component';

describe('ContenedorPopUpComponent', () => {
  let component: ContenedorPopUpComponent;
  let fixture: ComponentFixture<ContenedorPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
