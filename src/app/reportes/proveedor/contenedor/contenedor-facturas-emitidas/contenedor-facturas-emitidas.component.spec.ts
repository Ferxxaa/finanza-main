import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorFacturasEmitidasComponent } from './contenedor-facturas-emitidas.component';

describe('ContenedorFacturasEmitidasComponent', () => {
  let component: ContenedorFacturasEmitidasComponent;
  let fixture: ComponentFixture<ContenedorFacturasEmitidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorFacturasEmitidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorFacturasEmitidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
