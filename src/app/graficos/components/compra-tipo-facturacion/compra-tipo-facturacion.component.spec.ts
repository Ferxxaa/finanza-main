import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraTipoFacturacionComponent } from './compra-tipo-facturacion.component';

describe('CompraTipoFacturacionComponent', () => {
  let component: CompraTipoFacturacionComponent;
  let fixture: ComponentFixture<CompraTipoFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraTipoFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraTipoFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
