import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaResumenGraficosComponent } from './tabla-resumen-graficos.component';

describe('TablaResumenGraficosComponent', () => {
  let component: TablaResumenGraficosComponent;
  let fixture: ComponentFixture<TablaResumenGraficosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaResumenGraficosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaResumenGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
