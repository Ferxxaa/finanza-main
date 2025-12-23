import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaConsolidadoComponent } from './tabla-consolidado.component';

describe('TablaConsolidadoComponent', () => {
  let component: TablaConsolidadoComponent;
  let fixture: ComponentFixture<TablaConsolidadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaConsolidadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaConsolidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
