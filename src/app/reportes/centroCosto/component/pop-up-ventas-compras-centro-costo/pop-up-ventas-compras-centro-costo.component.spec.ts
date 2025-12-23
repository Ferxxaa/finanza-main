import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpVentasComprasCentroCostoComponent } from './pop-up-ventas-compras-centro-costo.component';

describe('PopUpVentasComprasCentroCostoComponent', () => {
  let component: PopUpVentasComprasCentroCostoComponent;
  let fixture: ComponentFixture<PopUpVentasComprasCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpVentasComprasCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpVentasComprasCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
