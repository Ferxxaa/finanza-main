import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorReporteComponent } from './contenedor-reporte.component';

describe('ContenedorReporteComponent', () => {
  let component: ContenedorReporteComponent;
  let fixture: ComponentFixture<ContenedorReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
