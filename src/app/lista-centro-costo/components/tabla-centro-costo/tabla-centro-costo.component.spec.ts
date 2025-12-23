import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCentroCostoComponent } from './tabla-centro-costo.component';

describe('TablaCentroCostoComponent', () => {
  let component: TablaCentroCostoComponent;
  let fixture: ComponentFixture<TablaCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
