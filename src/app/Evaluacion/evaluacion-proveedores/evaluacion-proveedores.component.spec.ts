import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionProveedoresComponent } from './evaluacion-proveedores.component';

describe('EvaluacionProveedoresComponent', () => {
  let component: EvaluacionProveedoresComponent;
  let fixture: ComponentFixture<EvaluacionProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
