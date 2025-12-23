import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoTablaOperacionalComponent } from './contenido-tabla-operacional.component';

describe('ContenidoTablaOperacionalComponent', () => {
  let component: ContenidoTablaOperacionalComponent;
  let fixture: ComponentFixture<ContenidoTablaOperacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoTablaOperacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoTablaOperacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
