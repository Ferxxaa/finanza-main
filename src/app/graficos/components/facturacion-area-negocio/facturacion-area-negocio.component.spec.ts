import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionAreaNegocioComponent } from './facturacion-area-negocio.component';

describe('FacturacionAreaNegocioComponent', () => {
  let component: FacturacionAreaNegocioComponent;
  let fixture: ComponentFixture<FacturacionAreaNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionAreaNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionAreaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
