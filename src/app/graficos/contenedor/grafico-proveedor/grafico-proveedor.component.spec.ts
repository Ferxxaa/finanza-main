import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoProveedorComponent } from './grafico-proveedor.component';

describe('GraficoProveedorComponent', () => {
  let component: GraficoProveedorComponent;
  let fixture: ComponentFixture<GraficoProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
