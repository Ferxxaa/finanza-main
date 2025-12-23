import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorVentasAreaNegocioComponent } from './contenedor-ventas-area-negocio.component';

describe('ContenedorVentasAreaNegocioComponent', () => {
  let component: ContenedorVentasAreaNegocioComponent;
  let fixture: ComponentFixture<ContenedorVentasAreaNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorVentasAreaNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorVentasAreaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
