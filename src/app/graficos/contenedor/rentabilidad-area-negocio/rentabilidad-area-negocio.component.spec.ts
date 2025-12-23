import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentabilidadAreaNegocioComponent } from './rentabilidad-area-negocio.component';

describe('RentabilidadAreaNegocioComponent', () => {
  let component: RentabilidadAreaNegocioComponent;
  let fixture: ComponentFixture<RentabilidadAreaNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentabilidadAreaNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentabilidadAreaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
