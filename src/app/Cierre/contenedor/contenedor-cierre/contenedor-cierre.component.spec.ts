import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorCierreComponent } from './contenedor-cierre.component';

describe('ContenedorCierreComponent', () => {
  let component: ContenedorCierreComponent;
  let fixture: ComponentFixture<ContenedorCierreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorCierreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorCierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
