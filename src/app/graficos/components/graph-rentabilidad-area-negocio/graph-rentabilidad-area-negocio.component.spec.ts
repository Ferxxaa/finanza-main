import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphRentabilidadAreaNegocioComponent } from './graph-rentabilidad-area-negocio.component';

describe('GraphRentabilidadAreaNegocioComponent', () => {
  let component: GraphRentabilidadAreaNegocioComponent;
  let fixture: ComponentFixture<GraphRentabilidadAreaNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphRentabilidadAreaNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphRentabilidadAreaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
