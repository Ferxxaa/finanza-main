import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpOrdenPedidoComponent } from './orden-pedido.component';

describe('PopUpOrdenPedidoComponent', () => {
  let component: PopUpOrdenPedidoComponent;
  let fixture: ComponentFixture<PopUpOrdenPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpOrdenPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpOrdenPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
