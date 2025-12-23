import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorConsolidaRentabilidadComponent } from './contenedor-consolida-rentabilidad.component';

describe('ContenedorConsolidaRentabilidadComponent', () => {
  let component: ContenedorConsolidaRentabilidadComponent;
  let fixture: ComponentFixture<ContenedorConsolidaRentabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorConsolidaRentabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorConsolidaRentabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
