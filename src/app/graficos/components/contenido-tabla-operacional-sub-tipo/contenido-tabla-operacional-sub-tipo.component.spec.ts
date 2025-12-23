import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoTablaOperacionalSubTipoComponent } from './contenido-tabla-operacional-sub-tipo.component';

describe('ContenidoTablaOperacionalSubTipoComponent', () => {
  let component: ContenidoTablaOperacionalSubTipoComponent;
  let fixture: ComponentFixture<ContenidoTablaOperacionalSubTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoTablaOperacionalSubTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoTablaOperacionalSubTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
