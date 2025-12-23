import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTipoGastoComponent } from './grafico-tipo-gasto.component';

describe('GraficoTipoGastoComponent', () => {
  let component: GraficoTipoGastoComponent;
  let fixture: ComponentFixture<GraficoTipoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoTipoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoTipoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
