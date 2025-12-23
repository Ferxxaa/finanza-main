import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReporteCentroCostoComponent } from './tabla-reporte-centro-costo.component';

describe('TablaReporteCentroCostoComponent', () => {
  let component: TablaReporteCentroCostoComponent;
  let fixture: ComponentFixture<TablaReporteCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaReporteCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReporteCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
