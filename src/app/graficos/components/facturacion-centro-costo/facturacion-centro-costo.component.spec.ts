import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionCentroCostoComponent } from './facturacion-centro-costo.component';

describe('FacturacionCentroCostoComponent', () => {
  let component: FacturacionCentroCostoComponent;
  let fixture: ComponentFixture<FacturacionCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
