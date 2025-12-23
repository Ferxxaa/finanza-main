import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosIngresosComponent } from './registros-ingresos.component';

describe('RegistrosIngresosComponent', () => {
  let component: RegistrosIngresosComponent;
  let fixture: ComponentFixture<RegistrosIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
