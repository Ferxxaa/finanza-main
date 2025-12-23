import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadEstadoPagoComponent } from './rad-estado-pago.component';

describe('RadEstadoPagoComponent', () => {
  let component: RadEstadoPagoComponent;
  let fixture: ComponentFixture<RadEstadoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadEstadoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadEstadoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
