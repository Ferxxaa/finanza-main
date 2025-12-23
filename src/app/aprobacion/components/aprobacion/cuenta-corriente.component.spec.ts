import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { aprobacion } from './cuenta-corriente.component';

describe('CuentaCorrienteComponent', () => {
  let component: aprobacion;
  let fixture: ComponentFixture<aprobacion>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ aprobacion ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(aprobacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
