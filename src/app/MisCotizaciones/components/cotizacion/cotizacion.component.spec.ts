import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCotizacionComponent } from './cotizacion.component';

describe('CotizacionComponent', () => {
  let component: MiCotizacionComponent;
  let fixture: ComponentFixture<MiCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
