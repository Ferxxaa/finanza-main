import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaConsolidadoOperacionalComponent } from './tabla-consolidado-operacional.component';

describe('TablaConsolidadoOperacionalComponent', () => {
  let component: TablaConsolidadoOperacionalComponent;
  let fixture: ComponentFixture<TablaConsolidadoOperacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaConsolidadoOperacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaConsolidadoOperacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
