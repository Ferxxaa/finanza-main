import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCotizacionesTemplateComponent } from './mis-cotizaciones-template.component';

describe('MisCotizacionesTemplateComponent', () => {
  let component: MisCotizacionesTemplateComponent;
  let fixture: ComponentFixture<MisCotizacionesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisCotizacionesTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCotizacionesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
