import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRentabilidadComponent } from './tabla-rentabilidad.component';

describe('TablaRentabilidadComponent', () => {
  let component: TablaRentabilidadComponent;
  let fixture: ComponentFixture<TablaRentabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRentabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRentabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
