import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionMensualComponent } from './facturacion-mensual.component';

describe('FacturacionMensualComponent', () => {
  let component: FacturacionMensualComponent;
  let fixture: ComponentFixture<FacturacionMensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionMensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
