import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdenPedidoComponent } from './add-orden-pedido.component';

describe('AddOrdenPedidoComponent', () => {
  let component: AddOrdenPedidoComponent;
  let fixture: ComponentFixture<AddOrdenPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrdenPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdenPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
