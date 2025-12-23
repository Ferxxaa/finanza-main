import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCotizacionesComponent } from './mis-cotizaciones.component';

describe('MisCotizacionesComponent', () => {
  let component: MisCotizacionesComponent;
  let fixture: ComponentFixture<MisCotizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisCotizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
