import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoConsolidadoBarrasComponent } from './grafico-consolidado-barras.component';

describe('GraficoConsolidadoBarrasComponent', () => {
  let component: GraficoConsolidadoBarrasComponent;
  let fixture: ComponentFixture<GraficoConsolidadoBarrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoConsolidadoBarrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoConsolidadoBarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
