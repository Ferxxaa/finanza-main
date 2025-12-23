import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCentroCostoComponent } from './detalle-centro-costo.component';

describe('DetalleCentroCostoComponent', () => {
  let component: DetalleCentroCostoComponent;
  let fixture: ComponentFixture<DetalleCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
