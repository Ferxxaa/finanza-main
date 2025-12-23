import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEvaluacionesComponent } from './detalle-evaluaciones.component';

describe('DetalleEvaluacionesComponent', () => {
  let component: DetalleEvaluacionesComponent;
  let fixture: ComponentFixture<DetalleEvaluacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEvaluacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
