import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasEmitidasAgnoComponent } from './facturas-emitidas-agno.component';

describe('FacturasEmitidasAgnoComponent', () => {
  let component: FacturasEmitidasAgnoComponent;
  let fixture: ComponentFixture<FacturasEmitidasAgnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasEmitidasAgnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasEmitidasAgnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
