import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorReporteCentroCostoComponent } from './contenedor-reporte-centro-costo.component';

describe('ContenedorReporteCentroCostoComponent', () => {
  let component: ContenedorReporteCentroCostoComponent;
  let fixture: ComponentFixture<ContenedorReporteCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorReporteCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorReporteCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
