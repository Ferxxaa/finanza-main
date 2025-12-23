import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetalleCentroCostoComponent } from './view-detalle-centro-costo.component';

describe('ViewDetalleCentroCostoComponent', () => {
  let component: ViewDetalleCentroCostoComponent;
  let fixture: ComponentFixture<ViewDetalleCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetalleCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetalleCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
